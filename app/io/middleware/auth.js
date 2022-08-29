const { RoomPREFIX } = require('../../../config/config.static')

module.exports = () => {
  return async (ctx, next) => {
    const { app, socket, logger, helper, service } = ctx
    const id = socket.id
    const nsp = app.io.of('/forum')
    const query = socket.handshake.query
    // 用户信息
    const { room, userId } = query
    const rooms = [room]
    logger.info('#user_info', id, room, userId)
    const tick = (id, msg) => {
      logger.info('#tick', id, msg)

      // 踢出用户前发送消息
      socket.emit(id, helper.parseMsg('deny', msg))

      // 调用 adapter 方法踢出用户，客户端触发 disconnect 事件
      nsp.adapter.remoteDisconnect(id, true, (err) => {
        logger.info(err)
      })
    }

    // 检查房间是否存在，不存在则踢出用户
    const hasRoom = await service.cache.get(`${RoomPREFIX}:${room}`)

    logger.info('#has_exist', hasRoom)

    if (!hasRoom) {
      tick(id, {
        type: 'deleted',
        message: 'deleted, room has been deleted.',
      })
      return
    }

    // 用户加入
    logger.info('#join', room)
    socket.join(room)
    // 在线列表
    nsp.adapter.clients(rooms, (err, clients) => {
      logger.info('#online_join', clients)

      // 更新在线用户列表
      nsp.to(room).emit('online', {
        clients,
        action: 'join',
        target: 'participator',
        message: `User(${id}) joined.`,
      })
    })

    await next()

    // 用户离开
    logger.info('#leave', room)

    // 在线列表
    nsp.adapter.clients(rooms, (err, clients) => {
      logger.info('#online_leave', clients)

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
        message: `User(${id}) leaved.`,
      })
    })
  }
}
