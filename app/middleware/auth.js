/**
 *
 * @param {*} options   app.config[${middlewareName}]
 * @returns
 */

const { error } = require('../utils')

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
    console.log('当前登录人是:', username)
    if (username) {
      await next()
    }
  }
}
