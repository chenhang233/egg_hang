const { Controller } = require('egg')
const { tempRoom } = require('../../../config/config.static')

class NspController extends Controller {
  async exchange() {
    const { ctx, app, service } = this
    const nsp = app.io.of('/forum')
    const message = ctx.args[0] || {}
    const socket = ctx.socket
    const client = socket.id
    try {
      const { payload } = message
      const { nickname, avatar } = await service.sql.selectByUUID(
        'adminuserinfo',
        payload.uuid
      )
      let base64 = null
      if (!/^http/.test(avatar)) {
        base64 = await this.service.users.getBASE64Image(avatar)
      } else {
        base64 = avatar
      }
      const msg = ctx.helper.parseMsg(
        'exchange',
        {
          ...payload,
          nickname: nickname,
          avatar: base64,
          datetime: Date.now(),
          type: 'other',
        },
        { client }
      )
      // nsp.emit(target, msg)
      nsp.adapter.clients([tempRoom], (err, clients) => {
        // 发送信息
        socket.broadcast.emit('message', msg)
        msg.data.payload.type = 'me'
        nsp.to(client).emit('message', msg)
      })
    } catch (error) {
      app.logger.error(error)
    }
  }
}

module.exports = NspController
