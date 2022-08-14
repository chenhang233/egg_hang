const { Service } = require('egg')
const { error } = require('../utils')

class UsersService extends Service {
  setToken(info) {
    const token = this.app.jwt.sign({ info }, this.app.config.jwt.secret, {
      expiresIn: '1h',
    })
    return token
  }
  setRefreshToken(info) {
    const token = this.app.jwt.sign(
      { info, Refresh: true },
      this.app.config.jwt.secret,
      {
        expiresIn: '3h',
      }
    )
    return token
  }
  verifyToken(token) {
    try {
      const info = this.app.jwt.verify(token, this.config.jwt.secret)
      return { username: info.info.username, pastTime: info.exp, details: info }
    } catch (e) {
      this.ctx.status = 401
      return (this.ctx.body = error(208))
    }
  }
  async insertLoginAction(table, info) {
    const data = await this.app.mysql.insert(table, info)
    return data
  }
  async updateUserInfo(table, obj) {
    const res = await this.app.mysql.update(table, obj, {
      where: { uuid: obj.uuid },
    })
    if (res.affectedRows === 0) return (this.ctx.body = error(507))
  }
  // async insertLoginAction(table, info) {
  //   const data = await this.app.mysql.insert(table, info)
  //   return data
  // }
  async cannotKeys() {
    return ['id', 'roleId', 'routerId', 'routerFnId', 'interfaceId']
  }
}

module.exports = UsersService
