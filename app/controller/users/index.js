const { Controller } = require('egg')
const { error, UUID, success } = require('../../utils/index')
const { admin } = require('../../../config/config.static')
const fs = require('fs')
const path = require('path')
class IndexController extends Controller {
  async index() {}
  async register() {
    const ctx = this.ctx
    const { username, password } = ctx.request.body
    if (!username || !password) {
      return (ctx.body = error(204))
    }
    const prevData = await ctx.service.sql.selectByName('adminuser', username)

    if (prevData) return (ctx.body = error(202))
    const uuid = UUID(password)
    const conn = await ctx.app.mysql.beginTransaction()
    try {
      await conn.insert('adminuser', {
        uuid,
        account: username,
        password,
        roleId: 1,
      })
      await conn.insert('adminuserinfo', {
        uuid,
        avatar:
          'https://img1.baidu.com/it/u=482361127,3010567847&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1659459600&t=297eed9ee7882554263764f96cc8ae73',
        registerTime: ctx.app.mysql.literals.now,
      })
      await conn.commit()
      return (ctx.body = success(200, {
        username: username,
        password: password,
      }))
    } catch (error) {
      await conn.rollback()
      throw error
    }
  }
  async login() {
    const ctx = this.ctx
    const { username, password } = ctx.request.body
    if (!username || !password) {
      return (ctx.body = error(204))
    }
    const prevData = await ctx.service.sql.selectByName('adminuser', username)
    if (!prevData) return (ctx.body = error(204))
    if (prevData.password !== password) return (ctx.body = error(204))
    const infoData = await ctx.service.sql.selectByUUID(
      'adminuserinfo',
      prevData.uuid
    )
    // const cannotKeys = ctx.service.users.cannotKeys()
    const userinfo = { ...prevData, ...infoData, username: username }
    const token = ctx.service.users.setToken(userinfo)
    const refreshToken = ctx.service.users.setRefreshToken(userinfo)
    await ctx.service.users.insertLoginAction({
      uuid: prevData.uuid,
      loginTime: Date.now(),
    })
    await ctx.service.cache.set('UUID', prevData.uuid)
    return (ctx.body = success(200, {
      // menu: { menuInfo: menus, router: routeArr },
      token,
      refreshToken,
    }))
  }
  async logout() {
    const ctx = this.ctx
    const { uuid, logoutTime } = ctx.request.body
    if (!uuid) {
      return (ctx.body = error(508))
    }
    const infoArr = await ctx.service.sql.selectAll('logininfo')
    infoArr.sort((a, b) => b.id - a.id)
    const id = infoArr.find((obj) => obj.uuid === uuid).id
    const err = await ctx.service.users.updateLogoutAction(logoutTime, id)
    if (err) return (ctx.body = err)
    return (ctx.body = success(200))
  }
  async getUserMenus() {
    const ctx = this.ctx
    const UUID = await ctx.service.cache.get('UUID')
    if (!UUID) {
      return (ctx.body = error(508))
    }
    const user = await ctx.service.sql.selectByUUID('adminuser', UUID)
    const menus = await ctx.service.sql.selectByUUID(
      'adminuserrole',
      user.roleId
    )
    const routerKeysArr = menus.routerId ? menus.routerId.split(',') : [0]
    let routeArr = await ctx.service.sql.selectAll('adminuserrouter')
    if (admin.includes(routerKeysArr[0])) {
      routeArr.forEach((obj) => (obj.auth = true))
    } else {
      routeArr.forEach(
        (obj) => (obj.auth = routerKeysArr.includes(String(obj.uuid)))
      )
    }
    // console.log(routeArr, 'routeArr', routerKeysArr, 'routerKeysArr')
    const cannotKeys = await ctx.service.users.cannotKeys()
    for (let k in menus) {
      if (cannotKeys.includes(k)) delete menus[k]
    }
    for (let obj of routeArr) {
      for (let j in obj) {
        if (cannotKeys.includes(j)) delete obj[j]
      }
    }
    return (ctx.body = success(200, {
      menu: { menuInfo: menus, router: routeArr },
    }))
  }
  async getToken() {
    const ctx = this.ctx
    let { refreshToken } = ctx.request.body
    if (!refreshToken) return (ctx.body = error(217))
    if (!refreshToken.startsWith('Bearer ')) return (ctx.body = error(209))
    refreshToken = refreshToken.substring(7)
    const { details, username } =
      ctx.service.users.verifyRefreshToken(refreshToken)
    if (!username || !details || !details.Refresh) {
      const uuid = await ctx.service.cache.get('UUID')
      return (ctx.body = error(218, { code: 403, uuid: uuid }))
    }
    const token = ctx.service.users.setToken({
      details: details,
      username: username,
    })
    return (ctx.body = success(200, { token }))
  }
  async getUserInfo() {
    const ctx = this.ctx
    const UUID = await ctx.service.cache.get('UUID')
    if (!UUID) {
      return (ctx.body = error(508))
    }
    const adminuser = await ctx.service.sql.selectByUUID('adminuser', UUID)
    if (!adminuser) return (ctx.body = error(207))
    const adminuserinfo = await ctx.service.sql.selectByUUID(
      'adminuserinfo',
      adminuser.uuid
    )
    const userinfo = { ...adminuser, ...adminuserinfo }
    userinfo.username = userinfo.account
    if (userinfo.avatar && !/^http/.test(userinfo.avatar)) {
      try {
        const res = fs.readFileSync(userinfo.avatar, 'binary')
        userinfo.avatar = res
      } catch {
        userinfo.avatar = null
      }
    }
    delete userinfo.account
    const cannotKeys = ['id', 'roleId', 'routerId', 'routerFnId', 'interfaceId']
    for (let k in userinfo) {
      if (cannotKeys.includes(k)) delete userinfo[k]
    }
    return (ctx.body = success(200, userinfo))
  }
  async setUserInfo() {
    const ctx = this.ctx
    const { id } = ctx.request.body
    //   name,
    //   sex,
    //   phone,
    //   address,
    //   introduction,
    //   avatar,
    if (!id) return (ctx.body = error(201))
    const adminuser = await ctx.service.sql.selectById('adminuser', id)
    if (!adminuser) return (ctx.body = error(207))
    const updateObj = {}
    for (const key in ctx.request.body) {
      if (ctx.request.body[key]) {
        updateObj[key] = ctx.request.body[key]
      }
    }
    updateObj.uuid = adminuser.uuid
    delete updateObj.id
    if (updateObj.avatar) return (ctx.body = error(506))
    const err = await ctx.service.users.updateUserInfo(
      'adminuserinfo',
      updateObj
    )
    if (err) return (ctx.body = err)
    return (ctx.body = success(200))
  }
  async uploadAvatar() {
    const ctx = this.ctx
    const { id, avatar } = ctx.request.body
    if (!id || !avatar) return (ctx.body = error(201))
    const adminuser = await ctx.service.sql.selectById('adminuser', id)
    if (!adminuser) return (ctx.body = error(207))
    const p = path.join(__dirname + '../../../uploads/') + Date.now()
    fs.writeFileSync(p, avatar)
    // this.logger.warn(err, '上传base64 error')
    const updateObj = {}
    updateObj.uuid = adminuser.uuid
    updateObj.avatar = p
    const data = await ctx.service.sql.selectByUUID(
      'adminuserinfo',
      updateObj.uuid
    )
    fs.unlinkSync(data.avatar) // 删老的
    const myerr = await ctx.service.users.updateUserInfo(
      'adminuserinfo',
      updateObj
    )
    if (myerr) return (ctx.body = myerr)
    return (ctx.body = success(200))
  }
}

module.exports = IndexController
