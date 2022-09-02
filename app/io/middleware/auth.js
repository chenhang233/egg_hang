module.exports = () => {
  return async (ctx, next) => {
    const { app, socket, logger, helper, service } = ctx
    // const id = socket.id
    const nsp = app.io.of('/forum')
    const query = socket.handshake.query
    // 用户信息
    const { room, uuid } = query
    const rooms = [room]
    socket.join(room)
    const { account } = await service.sql.selectByUUID('adminuser', uuid)
    nsp.adapter.clients(rooms, (err, clients) => {
      // 更新在线用户列表
      nsp.to(room).emit('online', {
        clients,
        action: 'join',
        target: 'participator',
        message: `用户(${account}) 加入.`,
      })
    })

    await next()

    // 用户离开
    logger.info('#leave', room)

    // 在线列表
    nsp.adapter.clients(rooms, (err, clients) => {
      // 获取 client 信息
      // const clientsDetail = {};
      // clients.forEach(client => {
      //   const _client = app.io.sockets.sockets[client];
      //   const _query = _client.handshake.query;
      //   clientsDetail[client] = _query;
      // });

      // 更新在线用户列表
      nsp.to(room).emit('online', {
        clients,
        action: 'leave',
        target: 'participator',
        message: `用户(${account}) 离开.`,
      })
    })
  }
}
