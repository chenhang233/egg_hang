const { Controller } = require('egg')
const { error, success } = require('../../utils')
const { admin } = require('../../../config/config.static')

class AuthorizationController extends Controller {
  async Index(obj) {
    //  PType(router,interface) params 参数
    const { PType, params, type } = obj
    const { uuid, routerId, interfaceId } = params
    const role = await this.service.sql.selectByUUID('adminuserrole', uuid)
    if (admin.includes(role.routerId)) return error(511)
    let p1 = null
    if (PType === 'router') {
      p1 = routerId
    }
    if (PType === 'interface') {
      p1 = interfaceId
    }
    const errNumer = this.service.roles.checkParamsNumber(uuid, p1)
    if (errNumer.length > 0) return errNumer[0]
    if (type === 'add') {
      const e = await this.service.roles.addAdminuserrole(
        uuid,
        {
          key: PType,
          value: p1,
        },
        PType
      )
      if (e) return e
    } else if (type === 'remove') {
      const e = await this.service.roles.removeAdminuserrole(
        uuid,
        {
          key: PType,
          value: p1,
        },
        PType
      )
      if (e) return e
    }
  }
  async readAuth() {
    const ctx = this.ctx
    const { uuid, condition } = ctx.request.body
    if (!uuid.toString()) return (ctx.body = error(508))
    if (!condition) return (ctx.body = error(220))
    const role = await ctx.service.sql.selectByUUID('adminuserrole', uuid)
    switch (condition) {
      case 'R':
        let routerIdArr = []
        admin.includes(role.routerId)
          ? routerIdArr.push(role.routerId)
          : (routerIdArr = role.routerId ? role.routerId.split(',') : [])
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
          : (interfaceIdArr = role.interfaceId
              ? role.interfaceId.split(',')
              : [])
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
    const e = await this.Index({
      PType: 'router',
      params: ctx.request.body,
      type: 'add',
    })
    if (e) return (ctx.body = e)
    return (ctx.body = success(200))
  }
  async removeRouter() {
    const ctx = this.ctx
    const e = await this.Index({
      PType: 'router',
      params: ctx.request.body,
      type: 'remove',
    })
    if (e) return (ctx.body = e)
    return (ctx.body = success(200))
  }
  async addInterface() {
    const ctx = this.ctx
    const e = await this.Index({
      PType: 'interface',
      params: ctx.request.body,
      type: 'add',
    })
    if (e) return (ctx.body = e)
    return (ctx.body = success(200))
  }
  async removeInterFace() {
    const ctx = this.ctx
    const e = await this.Index({
      PType: 'interface',
      params: ctx.request.body,
      type: 'remove',
    })
    if (e) return (ctx.body = e)
    return (ctx.body = success(200))
  }
}

module.exports = AuthorizationController
