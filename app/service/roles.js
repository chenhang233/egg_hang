const { Service } = require('egg')
const { success, error, UUID } = require('../utils')
const { admin } = require('../../config/config.static')

class RolesService extends Service {
  async checkRolenameIsSame(roleName) {
    if (!roleName) return (this.ctx.body = error(213))
    const roles = await this.service.sql.selectByEveryName('adminuserrole', {
      roleName: roleName,
    })
    if (roles && roles.length > 0) return (this.ctx.body = error(211))
  }
  async updateRole(table, obj) {
    const res = await this.app.mysql.update(table, obj, {
      where: { uuid: obj.uuid },
    })
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
  async selectByAnyFind(table, keyArr) {
    const allData = await this.app.mysql.select(table)
    if (admin.includes(keyArr[0])) {
      allData.forEach((obj) => (obj.auth = true))
      return allData
    }
    const data = allData.map((obj) => ({
      ...obj,
      auth: keyArr.includes(obj.uuid.toString()),
    }))
    return data
  }
  // 抽象更新角色信息    obj   key: 列名称,value: number,
  async addAdminuserrole(uuid, obj, PType) {
    const role = await this.ctx.service.sql.selectByUUID('adminuserrole', uuid)
    let prevArr = []
    let key = null
    if (PType === 'interface') {
      key = 'interfaceId'
      prevArr = role.interfaceId ? role.interfaceId.split(',') : []
    } else if (PType === 'router') {
      key = 'routerId'
      prevArr = role.routerId ? role.routerId.split(',') : []
    }
    if (!key) return error(201)
    if (prevArr.some((v) => +v === obj.value))
      return (this.ctx.body = error(216))
    prevArr.push(String(obj.value))
    const errRole = await this.ctx.service.roles.updateRole('adminuserrole', {
      uuid,
      [key]: prevArr.join(','),
    })
    if (errRole) return errRole
  }
  async removeAdminuserrole(uuid, obj, PType) {
    const role = await this.ctx.service.sql.selectByUUID('adminuserrole', uuid)
    let prevArr = []
    let key = null
    if (PType === 'interface') {
      key = 'interfaceId'
      prevArr = role.interfaceId ? role.interfaceId.split(',') : []
    } else if (PType === 'router') {
      key = 'routerId'
      prevArr = role.routerId ? role.routerId.split(',') : []
    }
    if (!key) return error(201)
    if (!prevArr.some((v) => +v === obj.value))
      return (this.ctx.body = error(216))
    prevArr = prevArr.filter((v) => +v !== obj.value)
    const errRole = await this.ctx.service.roles.updateRole('adminuserrole', {
      uuid,
      [key]: prevArr.join(','),
    })
    if (errRole) return errRole
  }
  checkParamsNumber(...params) {
    const err = []
    params.forEach((p) => {
      if ((!p && p !== 0) || typeof p !== 'number') {
        err.push(error(201))
      }
    })
    return err
  }
}

module.exports = RolesService
