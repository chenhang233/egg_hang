const { Controller } = require('egg')
const { tempRoom } = require('../../../config/config.static')
class NspController extends Controller {
  async exchange() {
    const { ctx, app } = this
    const nsp = app.io.of('/forum')
    const message = ctx.args[0] || {}
    const socket = ctx.socket
    const client = socket.id
    try {
      const { payload } = message
      const msg = ctx.helper.parseMsg('exchange', payload, { client })
      // nsp.emit(target, msg)
      nsp.adapter.clients([tempRoom], (err, clients) => {
        // 发送信息
        nsp.to(tempRoom).emit('message', msg)
      })
    } catch (error) {
      app.logger.error(error)
    }
  }
}

module.exports = NspController
