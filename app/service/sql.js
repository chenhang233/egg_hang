const { Service } = require('egg')

class SqlService extends Service {
  async selectAll(table) {
    const data = await this.app.mysql.select(table)
    return data
  }
}

module.exports = SqlService
