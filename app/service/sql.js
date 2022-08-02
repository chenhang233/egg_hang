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
  async selectByRouterFind(table, routerKey) {
    const arr = []
    routerKey.forEach((key) => {
      const data = admin.includes(key)
        ? this.app.mysql.select(table)
        : this.app.mysql.select(table, { where: { routerFnId: key } })
      arr.push(data)
    })
    return Promise.all(arr)
      .then((res) => {
        return res.flat()
      })
      .catch((e) => {
        this.logger.warn('sql promise all', e)
      })
  }
  async selectByUUIDFindUsername(uuid) {
    const data = await this.app.mysql.get('adminuser', {
      uuid,
    })
    return data.account
  }
  //   async insert
}

module.exports = SqlService
