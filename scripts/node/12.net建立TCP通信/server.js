const net = require('net')

const server = net.createServer((connection) => {
  connection.on('end', () => {
    console.log('客户端关闭连接')
  })
  connection.write('Hello World!\r\n')
})

server.listen(8080, () => {
  console.log('server running')
})
