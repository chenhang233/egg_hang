const { Controller } = require('egg')
const { error, UUID, success } = require('../../utils/index')
class IndexController extends Controller {
  async index() {}
  async register() {
    const ctx = this.ctx
    const { username, password } = ctx.request.body
    if (!username || !password) {
      return (ctx.body = error(204))
    }
    const prevData = await ctx.service.sql.selectByName('adminuser', username)

    if (prevData) return (ctx.body = error(202))
    const uuid = UUID(password)
    const conn = await ctx.app.mysql.beginTransaction()
    try {
      await conn.insert('adminuser', { uuid, account: username, password })
      await conn.insert('adminuserinfo', {
        uuid,
        avatar:
          'https://img1.baidu.com/it/u=482361127,3010567847&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1659459600&t=297eed9ee7882554263764f96cc8ae73',
        registerTime: ctx.app.mysql.literals.now,
      })
      await conn.commit()
      return (ctx.body = success(200, {
        username: username,
        password: password,
      }))
    } catch (error) {
      await conn.rollback()
      throw error
    }
  }
  async login() {
    const ctx = this.ctx
    const { username, password } = ctx.request.body
    if (!username || !password) {
      return (ctx.body = error(204))
    }
    const prevData = await ctx.service.sql.selectByName('adminuser', username)
    if (!prevData) return (ctx.body = error(204))

    return
  }
}

module.exports = IndexController
