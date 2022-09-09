const { Service } = require('egg')
const { error } = require('../utils')
const fs = require('fs')
const svgCaptcha = require('svg-captcha')
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
        expiresIn: '7h',
      }
    )
    return token
  }
  verifyToken(token) {
    try {
      const info = this.app.jwt.verify(token, this.config.jwt.secret)
      return { username: info.info.username, pastTime: info.exp, details: info }
    } catch (e) {
      return (this.ctx.status = 401)
    }
  }
  verifyRefreshToken(refreshToken) {
    try {
      const info = this.app.jwt.verify(refreshToken, this.config.jwt.secret)
      return { username: info.info.username, pastTime: info.exp, details: info }
    } catch (e) {
      return (this.ctx.status = 403)
    }
  }
  async insertLoginAction(info) {
    const data = await this.app.mysql.insert('logininfo', info)
    return data
  }
  async updateLogoutAction(logoutTime, id) {
    const data = await this.app.mysql.update(
      'logininfo',
      { logoutTime },
      { where: { id: id } }
    )
    if (data.affectedRows === 0) return error(507)
  }
  async updateUserInfo(table, obj) {
    const res = await this.app.mysql.update(table, obj, {
      where: { uuid: obj.uuid },
    })
    if (res.affectedRows === 0) return error(507)
  }
  // async insertLoginAction(table, info) {
  //   const data = await this.app.mysql.insert(table, info)
  //   return data
  // }
  async cannotKeys() {
    return ['id', 'roleId', 'routerId', 'routerFnId', 'interfaceId']
  }
  async getBASE64Image(path) {
    let base64 = null
    try {
      base64 = 'data:image/jpeg;base64,' + fs.readFileSync(path, 'base64')
    } catch (e) {}
    return base64
  }
  async getCaptcha() {
    const captcha = svgCaptcha.create({
      size: 4,
      fontSize: 50,
      width: 100,
      height: 40,
      background: '#cc9966',
    })
    return captcha
  }
}

module.exports = UsersService
