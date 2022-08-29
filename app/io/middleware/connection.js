module.exports = () => {
  return async (ctx, next) => {
    const { app, socket, logger, helper, service } = ctx
    const id = socket.id
    const nsp = app.io.of('/login')
    const query = socket.handshake.query
    // console.log(id, 'id', query, 'query')
    // 用户信息
    const { room, uuid } = query
    await next()
    // execute when disconnect.
    nsp.adapter.clients([room], async (err, clients) => {
      const infoArr = await service.sql.selectAll('logininfo')
      infoArr.sort((a, b) => b.id - a.id)
      const id = infoArr.find((obj) => obj.uuid === uuid).id
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
        'out remain 非正常退出'
      )
    })
  }
}
