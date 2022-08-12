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
    let token = ctx.headers.authorization
    const url = ctx.url
    console.log(ctx.ip, ctx.ips, 'ip', url, 'url')
    if (whiteurlList.includes(url)) return await next()
    if (!token) return (ctx.body = error(209))
    if (!token.startsWith('Bearer ')) return (ctx.body = error(209))
    token = token.substring(7)
    // console.log('中间件执行,auth', token, url)
    const { username, details } = ctx.service.users.verifyToken(token)
    if (details && details.Refresh) return (ctx.body = error(215))
    console.log('权限中心, 当前登录人是:', username)
    console.log('权限中心, 当前请求url:', url)
    if (username) {
      let flag = false
      const userinfo = await ctx.service.sql.selectByName('adminuser', username)
      const roleArr = await ctx.service.sql.selectByEveryName('adminuserrole', {
        uuid: userinfo.roleId,
      })
      if (admin.includes(roleArr[0].routerId)) {
        return await next(options)
      }
      const interfaceArr = await ctx.service.roles.selectRoleVisitInterface()
      const authObj = interfaceArr.find((v) => v.url === url)
      if (!authObj) return (ctx.body = error(510))
      roleArr.forEach((role) => {
        const canArr = role.interfaceId.split(',')
        if (canArr.includes(authObj.uuid)) {
          flag = true
        }
      })
      if (flag) {
        return await next()
      }
      console.log(flag, url, '没有当前接口权限')
      ctx.status = 401
      return (ctx.body = error(509))
    } else {
      return (ctx.body = error(207))
    }
  }
}
