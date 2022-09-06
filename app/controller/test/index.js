const { Controller } = require('egg')
const { success, error } = require('../../utils')

class TestController extends Controller {
  async getLoginRecordInfo() {
    const { ctx } = this
    const { pageSize, pageNumber } = ctx.query
    if (!Number(pageSize) || !Number(pageNumber)) return (ctx.body = error(201))
    const data = await ctx.service.sql.selectByPage('logininfo', {
      limit: Number(pageSize),
      offset: (pageNumber - 1) * pageSize,
    })
    if (!data.length) return (ctx.body = error(515))
    ctx.body = success(200, data)
  }
}

module.exports = TestController
