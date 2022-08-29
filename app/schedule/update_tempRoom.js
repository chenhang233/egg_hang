const { Subscription } = require('egg')
const { RoomPREFIX, tempRoom } = require('../../config/config.static')

class UpdateTempRoom extends Subscription {
  static get schedule() {
    return {
      interval: '1day',
      type: 'all',
      immediate: true,
    }
  }

  async subscribe() {
    await this.service.cache.set(`${RoomPREFIX}:${tempRoom}`, true)
    const room = await this.service.cache.get(`${RoomPREFIX}:${tempRoom}`)
    this.logger.info('当前 tempRoom 内存的情况', room)
  }
}

module.exports = UpdateTempRoom
