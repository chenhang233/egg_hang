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
    await ctx.service.users.insertLoginAction('logininfo', {
      uuid: prevData.uuid,
      loginTime: Date.now(),
    })
    return (ctx.body = success(200, {
      // menu: { menuInfo: menus, router: routeArr },
      token,
      refreshToken,
    }))
  }
  async getUserMenus() {
    const ctx = this.ctx
    const UUID = ctx.UUID
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
        (obj) => (obj.auth = routerKeysArr.includes(obj.routerFnId))
      )
    }
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
    if (!refreshToken) return (ctx.body = error(215))
    if (!refreshToken.startsWith('Bearer ')) return (ctx.body = error(209))
    refreshToken = refreshToken.substring(7)
    const { details, username } = ctx.service.users.verifyToken(refreshToken)
    if (!username || !details || !details.Refresh)
      return (ctx.body = error(215))
    const token = ctx.service.users.setToken({
      details: details,
      username: username,
    })
    return (ctx.body = success(200, { token }))
  }
  async getUserInfo() {
    const ctx = this.ctx
    const { id } = ctx.request.body
    if (!id) return (ctx.body = error(201))
    const adminuser = await ctx.service.sql.selectById('adminuser', id)
    if (!adminuser) return (ctx.body = error(207))
    const adminuserinfo = await ctx.service.sql.selectByUUID(
      'adminuserinfo',
      adminuser.uuid
    )
    delete adminuserinfo.id
    const userinfo = { ...adminuser, ...adminuserinfo }
    userinfo.username = userinfo.account
    if (userinfo.avatar) {
      const res = fs.readFileSync(userinfo.avatar, 'binary')
      userinfo.avatar = res
    }
    delete userinfo.account
    const cannotKeys = [
      'id',
      'uuid',
      'roleId',
      'routerId',
      'routerFnId',
      'interfaceId',
    ]
    for (let k in userinfo) {
      if (cannotKeys.includes(k) && k !== 'id') delete userinfo[k]
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
