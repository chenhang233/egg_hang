'use strict'

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  const { router, controller, io } = app
  router.get('/', controller.home.index)
  // socket.io
  io.of('/').route('exchange', io.controller.nsp.exchange)
  router.get(
    '/dashboard/visitNumbers',
    controller.dashboard.index.getvisitNumbers
  )
  router.get('/dashboard/getWebStudy', controller.dashboard.index.getWebStudy)
  router.post('/users/register', controller.users.index.register)
  router.post('/users/login', controller.users.index.login)
  router.post('/users/getUserMenus', controller.users.index.getUserMenus)
  router.post('/users/getUserInfo', controller.users.index.getUserInfo)
  router.post('/users/setUserInfo', controller.users.index.setUserInfo)
  router.post('/users/uploadAvatar', controller.users.index.uploadAvatar)
  router.post('/users/getToken', controller.users.index.getToken)
  router.post('/roles/read', controller.roles.index.readRole)
  router.post('/roles/add', controller.roles.index.addRole)
  router.post('/roles/update', controller.roles.index.updateRole)
  router.post('/roles/delete', controller.roles.index.deleteRole)
  router.post(
    '/authorization/readAuth',
    controller.authorization.index.readAuth
  )
  router.post(
    '/authorization/addRouter',
    controller.authorization.index.addRouter
  )
  router.post(
    '/authorization/removeRouter',
    controller.authorization.index.removeRouter
  )
  router.post(
    '/authorization/addInterface',
    controller.authorization.index.addInterface
  )
  router.post(
    '/authorization/removeInterFace',
    controller.authorization.index.removeInterFace
  )
}
