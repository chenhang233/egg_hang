const { Service } = require('egg')
const { error } = require('../utils')

class UsersService extends Service {
  setToken(info) {
    const token = this.app.jwt.sign({ info }, this.app.config.jwt.secret, {
      expiresIn: '1h',
    })
    return token
  }
  verifyToken(token) {
    try {
      const info = this.app.jwt.verify(token, this.config.jwt.secret)
      return { username: info.info.username, pastTime: info.exp }
    } catch (e) {
      this.ctx.status = 401
      return (this.ctx.body = error(208))
    }
  }
  async insertLoginAction(table, info) {
    const data = await this.app.mysql.insert(table, info)
    return data
  }
  // async insertLoginAction(table, info) {
  //   const data = await this.app.mysql.insert(table, info)
  //   return data
  // }
}

module.exports = UsersService