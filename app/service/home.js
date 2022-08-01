const { Service } = require('egg')

class HomeService extends Service {
  async find(uid) {
    // 假如 我们拿到用户 id 从数据库获取用户详细信息
    const user = await this.app.mysql.get('users', { id: 11 })
    return { user }
  }
}
