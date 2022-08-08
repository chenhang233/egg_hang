const { Subscription } = require('egg')

class UpdateCache extends Subscription {
  // 通过 schedule 属性来设置定时任务的执行间隔等配置
  static get schedule() {
    return {
      interval: '1day', // 间隔
      type: 'worker', //ALL 指定所有的 worker 都需要执行
      //   worker 类型：每台机器上只有一个 worker 会执行这个定时任务，每次执行定时任务的 worker 的选择是随机的
      immediate: true,
    }
  }

  // subscribe 是真正定时任务执行时被运行的函数
  async subscribe() {
    // const data = await this.ctx.service.sql.selectAll('logininfo')
    // this.ctx.app.cache = data
    console.log('定时任务test')
  }
}

module.exports = UpdateCache
