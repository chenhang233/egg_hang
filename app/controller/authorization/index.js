const { Controller } = require('egg')
const { error, success } = require('../../utils')

class AuthorizationController extends Controller {
  async addRouter() {
    const ctx = this.ctx
    const { id, routerId } = ctx.request.body
    const errNumer = this.service.roles.checkParamsNumber(id, routerId)
    if (errNumer) return errNumer
    const errRouter = await this.service.roles.addAdminuserrole(id, {
      key: 'routerId',
      value: routerId,
    })
    if (errRouter) return errRouter
    return (ctx.body = success(200))
  }
  async addInterface() {
    const ctx = this.ctx
    const { id, interfaceId } = ctx.request.body
    const errNumer = this.service.roles.checkParamsNumber(id, interfaceId)
    if (errNumer) return errNumer
    const errInter = await this.service.roles.addAdminuserrole(id, {
      key: 'interfaceId',
      value: interfaceId,
    })
    if (errInter) return errInter
    return (ctx.body = success(200))
  }
}

module.exports = AuthorizationController
