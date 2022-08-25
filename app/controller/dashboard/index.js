const { Controller } = require('egg')
const { success, error } = require('../../utils')

class DashboardController extends Controller {
  async index() {
    const { ctx } = this
    ctx.body = '人数xxx'
  }
  async getvisitNumbers() {
    const { ctx } = this
    const info = await ctx.service.sql.selectAll('logininfo')
    const data = info.map(async (obj) => {
      obj.username = await ctx.service.sql.selectByUUIDFindUsername(obj.uuid)
      obj.loginTime = ctx.helper.cnTime(obj.loginTime)
      delete obj.uuid
      delete obj.id
      return obj
    })
    return Promise.all(data)
      .then((v) => {
        return (ctx.body = success(200, {
          details: v,
          count: info.length,
        }))
      })
      .catch((err) => {
        this.logger.warn('promise.all', err)
        return error(505)
      })
    // set.forEach((v) => setArr.push(v))
    // let username = await ctx.service.sql.selectByUUIDFindUsername(setArr)
  }
  async getWebStudy() {
    const ctx = this.ctx
    // https://www.apifox.cn/apidoc/project-1355504/doc-1144392
    const result = await ctx.curl('https://zhblogs.ohyee.cc/api/charts/arch', {
      dataType: 'json',
    })
    if (result.status === 200) {
      return (ctx.body = success(200, result.data.data))
    }
    ctx.body = error(505)
  }
}

module.exports = DashboardController
