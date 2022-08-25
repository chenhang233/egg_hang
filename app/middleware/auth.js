/**
 *
 * @param {*} options   app.config[${middlewareName}]
 * @returns
 */

const { error } = require('../utils')
const { admin } = require('../../config/config.static')
module.exports = (options) => {
  const { whiteurlList } = options
  return async function (ctx, next) {
    const interfaceAll = await ctx.service.sql.selectAll('adminuserinterface')
    const authInterfaceArr = interfaceAll
      .filter((obj) => !whiteurlList.includes(obj.url))
      .map((obj) => obj.url)
    const url = ctx.url
    // if (!authInterfaceArr.includes(url)) {
    //   return await next()
    // }
    if (
      !authInterfaceArr.includes(url) ||
      /^\/public/.test(url) ||
      /^\/static/.test(url) ||
      /^\/view/.test(url)
    ) {
      return await next()
    }
    let token = ctx.headers.authorization
    if (!token) return (ctx.body = error(215))
    if (!token.startsWith('Bearer ')) return (ctx.body = error(209))
    token = token.substring(7)
    console.log(ctx.ip, ctx.ips, 'ip', url, 'url')
    const { username, details } = ctx.service.users.verifyToken(token)
    console.log('中间件执行,auth')
    if (details && details.Refresh) return (ctx.body = error(215))
    console.log('权限中心, 当前登录人是:', username)
    console.log('权限中心, 当前请求url:', url)
    if (username) {
      let flag = false
      const userinfo = await ctx.service.sql.selectByName('adminuser', username)
      ctx.UUID = userinfo.uuid
      const roleArr = await ctx.service.sql.selectByEveryName('adminuserrole', {
        uuid: userinfo.roleId,
      })
      // console.log(roleArr, 'roleArr')
      if (!roleArr[0]) return (ctx.body = error(512))
      if (admin.includes(roleArr[0].routerId)) {
        return await next()
      }
      const interfaceArr = await ctx.service.roles.selectRoleVisitInterface()
      const authObj = interfaceArr.find((v) => v.url === url)
      if (!authObj) return (ctx.body = error(510))
      const currentRole = roleArr[0]
      const canArr = currentRole.interfaceId
        ? currentRole.interfaceId.split(',')
        : []
      console.log(canArr, 'canArr', authObj.uuid, 'authObj.uuid')
      if (canArr.includes(String(authObj.uuid))) {
        flag = true
      }
      if (flag) {
        return await next()
      }
      console.log(flag, url, '没有当前接口权限')
      return (ctx.body = error(509))
    } else {
      return (ctx.body = error(509))
    }
  }
}
