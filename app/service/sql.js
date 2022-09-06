const { Service } = require('egg')
const { admin } = require('../../config/config.static')

class SqlService extends Service {
  async selectAll(table) {
    const data = await this.app.mysql.select(table)
    return data
  }
  async selectByEveryName(table, obj) {
    const data = await this.app.mysql.select(table, { where: obj })
    return data
  }
  async selectByName(table, account) {
    const data = this.app.mysql.get(table, { account })
    return data
  }
  async selectByUUID(table, uuid) {
    const data = this.app.mysql.get(table, { uuid })
    return data
  }
  async selectById(table, id) {
    const data = this.app.mysql.get(table, { id })
    return data
  }
  async selectByPage(table, { limit, offset }) {
    const data = this.app.mysql.select(table, { limit, offset })
    return data
  }
  async selectByUUIDFindUsername(uuid) {
    const data = await this.app.mysql.get('adminuser', {
      uuid,
    })
    return data.account
  }
  async orderWhere(table, uuid) {
    const sql = `UPDATE ${table} SET uuid=uuid-1 where uuid>${uuid}`
    await this.app.mysql.query(sql)
  }
  transformObj(obj, ...omit) {
    omit.forEach((prop) => {
      if (obj[prop]) {
        delete obj[prop]
      }
    })
    return obj
  }
  transMap(arr, authArr) {
    return arr.map((obj) => {
      const o = { ...obj, auth: authArr ? authArr.includes(obj.uuid) : true }
      return this.transformObj(o, 'id')
    })
  }
}

module.exports = SqlService
