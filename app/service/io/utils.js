const tick = (socket, nsp, id, msg) => {
  // 踢出用户前发送消息
  socket.emit(id, helper.parseMsg('deny', msg))
  // 调用 adapter 方法踢出用户，客户端触发 disconnect 事件
  nsp.adapter.remoteDisconnect(id, true, (err) => {
    console.log(err, 'err tick')
  })
}

module.exports = {
  tick,
}
