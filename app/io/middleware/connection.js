module.exports = () => {
  return async (ctx, next) => {
    const { app, socket, logger, helper, service } = ctx
    const id = socket.id
    const nsp = app.io.of('/login')
    const query = socket.handshake.query
    // 用户信息
    const { room, uuid } = query
    const rooms = [room]
    socket.join(room)
    console.log(rooms, 'rooms', query, 'query')
    nsp.adapter.clients(rooms, (err, clients) => {
      // 更新在线用户列表
      console.log(clients, 'clients')
      nsp.to(id).emit('message', `初始连接成功--${1}`)
    })
    await next()
    // execute when disconnect.
    nsp.adapter.clients(rooms, async (err, clients) => {
      const infoArr = await service.sql.selectAll('logininfo')
      infoArr.sort((a, b) => b.id - a.id)
      const id = infoArr.find((obj) => obj.uuid === uuid)?.id
      id && (await service.users.updateLogoutAction(Date.now(), id))
      const allUUID = await service.cache.hashGETUUIDAll()
      for (const key in allUUID) {
        if (allUUID[key] === uuid) {
          await service.cache.hashRemoveUUID(key)
        }
      }
      logger.info(
        uuid,
        'UUID',
        await service.cache.hashGETUUIDAll(),
        'out remain socket退出'
      )
    })
  }
}
