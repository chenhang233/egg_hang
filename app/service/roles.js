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
  // 抽象更新角色信息    obj   key: 列名称,value: number,
  async addAdminuserrole(id, obj) {
    const role = await this.ctx.service.sql.selectById('adminuserrole', id)
    const prevArr = role.interfaceId.split(',')
    if (prevArr.some((v) => +v === obj.value))
      return (this.ctx.body = error(216))
    prevArr.push(obj.value)
    const errRole = await this.ctx.service.roles.updateRole('adminuserrole', {
      id: id,
      [obj.key]: prevArr.join(','),
    })
    if (errRole) return errRole
  }
  checkParamsNumber(...params) {
    params.forEach((p) => {
      if (!p || typeof p !== 'number') {
        return (this.ctx.body = error(201))
      }
    })
  }
}

module.exports = RolesService
