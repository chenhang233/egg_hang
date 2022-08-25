const { Controller } = require('egg')

const path = require('path')
const fs = require('fs')
class HomeController extends Controller {
  async index() {
    const { ctx } = this
    ctx.body = 'hi, egg'
  }
  async ReactIndex() {
    const { ctx } = this
    ctx.response.type = 'html'
    ctx.body = fs.readFileSync(path.resolve(__dirname, '../public/index.html'))
  }
  async static() {
    try {
      const { ctx } = this
      const pathname = ctx.request.URL.pathname
      console.log(pathname, 'pathname')
      console.log(
        path.resolve(__dirname, `../public/react${pathname}`),
        'static'
      )
      ctx.response.type = 'html'
      ctx.body = fs.readFileSync(
        path.resolve(__dirname, `../public/react${pathname}`)
      )
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = HomeController
