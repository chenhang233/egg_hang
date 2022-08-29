'use strict'

const { Controller } = require('egg')
const { loginRoom } = require('../../../config/config.static')

class DefaultController extends Controller {
  async ping() {
    console.log('执行')
    const { ctx, app } = this
    const message = ctx.args[0] || {}
    const nsp = app.io.of('/login')
    const client = socket.id
    try {
      const { target, payload } = message
      if (!target) return
      const msg = ctx.helper.parseMsg('login', payload, { client, target })
      nsp.adapter.clients([loginRoom], (err, clients) => {
        // 发送信息
        nsp.emit('message', msg)
      })
    } catch (error) {
      app.logger.error(error)
    }
  }
}

module.exports = DefaultController
