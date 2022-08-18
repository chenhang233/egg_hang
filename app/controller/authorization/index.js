const { Controller } = require('egg')
const { error, success } = require('../../utils')
const { admin } = require('../../../config/config.static')

class AuthorizationController extends Controller {
  async readAuth() {
    const ctx = this.ctx
    const { uuid, condition } = ctx.request.body
    if (!uuid.toString()) return (ctx.body = error(508))
    if (!condition) return (ctx.body = error(216))
    const role = await ctx.service.sql.selectByUUID('adminuserrole', uuid)
    switch (condition) {
      case 'R':
        let routerIdArr = []
        admin.includes(role.routerId)
          ? routerIdArr.push(role.routerId)
          : (routerIdArr = role.routerId.split(','))
        const data_1 = await ctx.service.roles.selectByAnyFind(
          'adminuserrouter',
          routerIdArr
        )
        const data_1_ = ctx.helper.transRouterChildren(data_1, null)
        return (ctx.body = success(200, data_1_))

      case 'I':
        let interfaceIdArr = []
        admin.includes(role.interfaceId)
          ? interfaceIdArr.push(role.interfaceId)
          : (interfaceIdArr = role.interfaceId.split(','))
        const data_2 = await ctx.service.roles.selectByAnyFind(
          'adminuserinterface',
          interfaceIdArr
        )
        return (ctx.body = success(200, data_2))
      default:
        return (ctx.body = error(201))
    }
  }

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
