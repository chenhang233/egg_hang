const events = require('events')
const eventEmitter = new events.EventEmitter()

const handle = () => {
  console.log('连接成功')
  eventEmitter.emit('data_received', { a: 1 })
}

eventEmitter.on('connection', handle)

eventEmitter.on('data_received', (res) => {
  console.log('数据接收', res)
})

eventEmitter.emit('connection')
