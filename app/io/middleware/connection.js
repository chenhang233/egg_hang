module.exports = () => {
  return async (ctx, next) => {
    ctx.socket.emit('res', '通信成功!')
    await next()
    // execute when disconnect.
    console.log('断开连接!')
  }
}
