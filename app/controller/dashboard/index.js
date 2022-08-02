const { Controller } = require('egg')
const { success, error } = require('../../utils')
const { cnTime } = require('../../extend/moment')

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
      obj.loginTime = cnTime(obj.loginTime)
      delete obj.uuid
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
}

module.exports = DashboardController
