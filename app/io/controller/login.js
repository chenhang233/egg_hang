'use strict'

const { Controller } = require('egg')
const { loginRoom } = require('../../../config/config.static')

class DefaultController extends Controller {
  async pinging() {
    const { ctx, app } = this
    const nsp = app.io.of('/login')
    const message = ctx.args[0] || {}
    const socket = ctx.socket
    const client = socket.id
    try {
      const { payload } = message
      const msg = ctx.helper.parseMsg('pinging', payload, { client })
      nsp.adapter.clients([loginRoom], (err, clients) => {
        nsp.to(client).emit('message', msg)
        nsp.to(loginRoom).emit('message', msg)
      })
    } catch (error) {
      app.logger.error(error)
    }
  }
}

module.exports = DefaultController
