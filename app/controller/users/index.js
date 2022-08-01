const { Controller } = require('egg')
const register = require('./register')
const { error } = require('../../utils/index')
const login = require('./login')
class IndexController extends Controller {
  async index() {}
  async register() {
    const ctx = this.ctx
    const { username, password } = ctx.request.body
    if (!username || !password) {
      return (ctx.body = error(204))
    }
    // return register(this.ctx)
  }
  async login() {
    return login(this.ctx)
  }
}

module.exports = IndexController
