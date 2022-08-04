const { Controller } = require('egg')
const { error, UUID, success } = require('../../utils/index')
const { admin } = require('../../../config/config.static')
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
    const infoData = await ctx.service.sql.selectByUUID(
      'adminuserinfo',
      prevData.uuid
    )
    const cannotKeys = [
      'id',
      'uuid',
      'roleId',
      'routerId',
      'routerFnId',
      'interfaceId',
    ]
    const userinfo = { ...prevData, ...infoData }
    const menus = await ctx.service.sql.selectByUUID(
      'adminuserrole',
      userinfo.roleId
    )
    if (!menus) return (ctx.body = error(505))
    const routerKeysArr = menus.routerId ? menus.routerId.split(',') : [0]
    let routeArr = await ctx.service.sql.selectAll('adminuserrouter')
    if (admin.includes(routerKeysArr[0])) {
      routeArr.forEach((obj) => (obj.auth = true))
    } else {
      routeArr.forEach(
        (obj) => (obj.auth = routerKeysArr.includes(obj.routerFnId))
      )
    }

    // console.log(routeArr, 'routeArr')
    for (let k in userinfo) {
      if (cannotKeys.includes(k)) delete userinfo[k]
      if (k === 'account') {
        userinfo['username'] = userinfo[k]
        delete userinfo[k]
      }
    }
    for (let k in menus) {
      if (cannotKeys.includes(k)) delete menus[k]
    }
    for (let obj of routeArr) {
      for (let j in obj) {
        if (cannotKeys.includes(j)) delete obj[j]
      }
    }
    const token = ctx.service.users.setToken(userinfo)
    const refreshToken = ctx.service.users.setRefreshToken(userinfo)
    await ctx.service.users.insertLoginAction('logininfo', {
      uuid: prevData.uuid,
      loginTime: Date.now(),
    })
    return (ctx.body = success(200, {
      userinfo: userinfo,
      menu: { menuInfo: menus, router: routeArr },
      token,
      refreshToken,
    }))
  }
  async getToken() {
    const ctx = this.ctx
    let { refreshToken } = ctx.request.body
    if (!refreshToken) return (ctx.body = error(215))
    if (!refreshToken.startsWith('Bearer ')) return (ctx.body = error(209))
    refreshToken = refreshToken.substring(7)
    const { details } = ctx.service.users.verifyToken(refreshToken)
    if (!details.Refresh) return (ctx.body = error(215))
    const token = ctx.service.users.setToken(details)
    return (ctx.body = success(200, { token }))
  }
}

module.exports = IndexController
