const { Service } = require('egg')

class HomeService extends Service {
  async find(uid) {
    const user = await this.app.mysql.get('users', { id: 11 })
    return { user }
  }
}
