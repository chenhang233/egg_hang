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
    socket.emit('res', 'connected!')
    // console.log(rooms, 'rooms', query, 'query', id, 'id')
    if (!uuid) {
      nsp.adapter.clients(rooms, (err, clients) => {
        const msg = helper.parseMsg(
          'error',
          { ...query, msg: `uuid不存在` },
          { clients }
        )
        nsp.to(id).emit('message', msg)
      })
      return
    }
    const timeId = await service.cache.get(uuid)
    if (timeId) {
      console.log(timeId, 'last timeId')
      clearTimeout(timeId)
    }
    const { account } = await service.sql.selectByUUID('adminuser', uuid)
    nsp.adapter.clients(rooms, (err, clients) => {
      const msg = helper.parseMsg(
        'message',
        { ...query, msg: `欢迎${account}登录` },
        { clients }
      )
      const msg2 = helper.parseMsg(
        'message',
        { ...query, msg: `新消息` },
        { clients }
      )
      nsp.to(id).emit('message', msg)
      // nsp.to(id).send(1)
      setTimeout(() => {
        nsp.to(id).emit('message', msg2)
      }, 5000)
    })
    await next()
    // execute when disconnect.
    let timeoutID = setTimeout(async () => {
      const infoArr = await service.sql.selectAll('logininfo')
      infoArr.sort((a, b) => b.id - a.id)
      const id = infoArr.find((obj) => obj.uuid === uuid)?.id
      if (id) {
        await service.users.updateLogoutAction(Date.now(), id)
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
      }
    }, 20000)[Symbol.toPrimitive]()
    await service.cache.set(uuid, timeoutID)
  }
}
