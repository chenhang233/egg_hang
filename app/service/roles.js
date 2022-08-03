const { Service } = require('egg')
const { success, error, UUID } = require('../utils')

class RolesService extends Service {
  async checkRolenameIsSame(roleName) {
    if (!roleName) return (this.ctx.body = error(213))
    const roles = await this.service.sql.selectByEveryName('adminuserrole', {
      roleName: roleName,
    })
    if (roles && roles.length > 0) return (this.ctx.body = error(211))
  }
  async updateRole(table, obj) {
    const res = await this.app.mysql.update(table, obj)
    if (res.affectedRows === 0) return (this.ctx.body = error(508))
  }
  async deleteRole(table, uuid) {
    const res = await this.app.mysql.delete(table, { uuid })
    if (res.affectedRows === 0) return (this.ctx.body = error(508))
  }
  async selectRoleVisitInterface() {
    const res = await this.app.mysql.select('adminuserinterface')
    return res
  }
}

module.exports = RolesService
