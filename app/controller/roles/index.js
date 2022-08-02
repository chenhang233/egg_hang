const { Controller } = require('egg')
const { success, error, UUID } = require('../../utils')

class RolesController extends Controller {
  async readRole() {
    const { ctx } = this
    const roles = await ctx.service.sql.selectAll('adminuserrole')
    roles.forEach((v) => {
      delete v.uuid
      delete v.routerId
    })
    return (ctx.body = success(200, roles))
  }
  async addRole() {
    const { ctx } = this
    const { roleName, roleMark } = ctx.request.body
    if (!roleName) return (ctx.body = error(213))
    const roles = await ctx.service.sql.selectByEveryName('adminuserrole', {
      roleName: roleName,
    })
    if (roles && roles.length > 0) return (ctx.body = error(211))
    const uuid = UUID(Math.random() * 10 + '')
    try {
      await ctx.app.mysql.insert('adminuserrole', {
        roleName,
        roleMark,
        uuid,
        routerId: 0,
      })
    } catch (e) {
      return (ctx.body = error(506))
    }
    return (ctx.body = success(200))
  }
  async updateRole() {
    const { ctx } = this
  }
  async deleteRole() {
    const { ctx } = this
  }
}

module.exports = RolesController
