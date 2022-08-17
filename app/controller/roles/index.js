const { Controller } = require('egg')
const { success, error, UUID } = require('../../utils')
const { admin } = require('../../../config/config.static')
class RolesController extends Controller {
  async readRole() {
    const { ctx } = this
    const roles = await ctx.service.sql.selectAll('adminuserrole')
    const interfaceArr = await ctx.service.roles.selectRoleVisitInterface()
    const routeArr = await ctx.service.sql.selectAll('adminuserrouter')
    roles.forEach((v) => {
      // const canInterface = v.interfaceId.split(',')
      // const canRouter = v.routerId.split(',')
      // if (admin.includes(canInterface[0]) && admin.includes(canRouter[0])) {
      //   v.interfaceArr = ctx.service.sql.transMap(interfaceArr)
      //   v.routerArr = ctx.service.sql.transMap(routeArr)
      // } else {
      //   v.interfaceArr = ctx.service.sql.transMap(interfaceArr, canInterface)
      //   v.routerArr = ctx.service.sql.transMap(routeArr, canRouter)
      // }
      // delete v.uuid
      delete v.id
      delete v.routerId
      delete v.interfaceId
    })
    return (ctx.body = success(200, roles))
  }
  async addRole() {
    const { ctx } = this
    const { roleName, roleMark } = ctx.request.body
    const err = await ctx.service.roles.checkRolenameIsSame(roleName)
    if (err) return (ctx.body = err)
    const uuid = Date.now()
    try {
      await ctx.app.mysql.insert('adminuserrole', {
        roleName,
        roleMark,
        uuid,
        routerId: 0,
      })
    } catch (e) {
      return (ctx.body = error(506))
    }
    return (ctx.body = success(200))
  }
  async updateRole() {
    const { ctx } = this
    const body = ctx.request.body
    const { id } = body
    // const err = await ctx.service.roles.checkRolenameIsSame(roleName)
    if (!id) return (ctx.body = error(508))
    const updateObj = {}
    if (body['routerId']) {
      // if (!(body['routerId'] instanceof Array)) {
      //   return (ctx.body = error(214))
      // }
      body['routerId'] = body['routerId'].join(',')
    }
    if (body['interfaceId']) {
      if (!(body['interfaceId'] instanceof Array)) {
        return (ctx.body = error(214))
      }
      body['interfaceId'] = body['interfaceId'].join(',')
    }
    for (const key in body) {
      if (body[key]) {
        updateObj[key] = body[key]
      }
    }
    const err = await ctx.service.roles.updateRole('adminuserrole', updateObj)
    if (err) return (ctx.body = err)
    return (ctx.body = success(200))
  }
  async deleteRole() {
    const { ctx } = this
    const { uuid } = ctx.request.body
    if (!uuid) return (ctx.body = error(508))
    const err = await ctx.service.roles.deleteRole('adminuserrole', uuid)
    if (err) return (ctx.body = err)
    return (ctx.body = success(200))
  }
}

module.exports = RolesController
