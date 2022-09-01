const { Subscription } = require('egg')

class UpdateCache extends Subscription {
  // 通过 schedule 属性来设置定时任务的执行间隔等配置
  static get schedule() {
    return {
      interval: '30m', // 间隔
      type: 'all', //ALL 指定所有的 worker 都需要执行
      //   worker 类型：每台机器上只有一个 worker 会执行这个定时任务，每次执行定时任务的 worker 的选择是随机的
      immediate: true,
    }
  }

  // subscribe 是真正定时任务执行时被运行的函数
  async subscribe() {
    const length = await this.service.cache.hashGETUUIDALL_length()
    this.logger.info('当前redis内存的登录数量', length)
  }
}

module.exports = UpdateCache
