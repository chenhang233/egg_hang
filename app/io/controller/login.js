'use strict'

const { Controller } = require('egg')
const { loginRoom } = require('../../../config/config.static')

class DefaultController extends Controller {
  async ping() {
    console.log('ping!!!')
    const { ctx, app } = this
    const message = ctx.args[0] || {}
    const nsp = app.io.of('/login')
    const id = socket.id
    console.log(message)
    try {
      const { payload } = message
      console.log('payload', payload)
      const msg = ctx.helper.parseMsg('ping', payload, { id })
      nsp.adapter.clients([loginRoom], (err, clients) => {
        nsp.to(id).emit('message', msg)
      })
    } catch (error) {
      app.logger.error(error)
    }
  }
}

module.exports = DefaultController
