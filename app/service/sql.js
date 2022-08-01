const { Service } = require('egg')

class SqlService extends Service {
  async selectAll(table) {
    const data = await this.app.mysql.select(table)
    return data
  }
  async selectByName(table, account) {
    const data = this.app.mysql.get(table, { account })
    return data
  }
  //   async insert
}

module.exports = SqlService
