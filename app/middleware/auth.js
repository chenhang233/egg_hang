/**
 *
 * @param {*} options   app.config[${middlewareName}]
 * @returns
 */

const { error } = require('../utils')
const { admin } = require('../../config/config.static')

module.exports = (options) => {
  const whiteList = ['/users/login', '/users/register']
  return async function (ctx, next) {
    let token = ctx.headers.authorization
    const url = ctx.url
    if (whiteList.includes(url)) return await next()
    if (!token) return (ctx.body = error(209))
    if (!token.startsWith('Bearer ')) return (ctx.body = error(209))
    token = token.substring(7)
    // console.log('中间件执行,auth', token, url)
    const { username } = ctx.service.users.verifyToken(token)
    console.log('权限中心, 当前登录人是:', username)
    console.log('权限中心, 当前请求url:', url)
    if (username) {
      let flag = false
      const userinfo = await ctx.service.sql.selectByName('adminuser', username)
      const roleArr = await ctx.service.sql.selectByEveryName('adminuserrole', {
        uuid: userinfo.roleId,
      })
      roleArr.forEach((role) => {
        if (admin.includes(role.routerId)) {
          flag = true
        }
      })
      if (flag) {
        return await next()
      }
      //   roleArr.forEach(role => {
      //     role.routerId
      //   })
      console.log(flag, '先不管')
      await next()
    } else {
      ctx.body = error(207)
    }
  }
}
