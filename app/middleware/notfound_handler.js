const { error } = require('../utils')
const fs = require('fs')
const path = require('path')

module.exports = () => {
  return async function notFoundHandler(ctx, next) {
    await next()
    if (ctx.status === 404 && !ctx.body) {
      console.log('中间件执行, 404')

      if (ctx.acceptJSON) {
        ctx.body = error(514)
      } else {
        ctx.response.type = 'html'
        ctx.body = fs.readFileSync(
          path.resolve(__dirname, '../public/index.html')
        )
        // ctx.body = '<h1>egg 找不到</h1>'
      }
    }
  }
}
