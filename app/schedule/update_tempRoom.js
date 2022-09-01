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

  async subscribe() {}
}

module.exports = UpdateTempRoom
