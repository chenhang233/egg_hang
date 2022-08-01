const { Controller } = require('egg')

class HomeController extends Controller {
  async index() {
    const { ctx } = this
    ctx.body = 'hi, egg'
    const data = await ctx.service.sql.selectAll('user')
    ctx.body = data
  }
}

module.exports = HomeController
