'use strict'

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  const { router, controller } = app
  router.get('/', controller.home.index)
  router.get(
    '/dashboard/visitNumbers',
    controller.dashboard.index.getvisitNumbers
  )
  router.post('/users/register', controller.users.index.register)
  router.post('/users/login', controller.users.index.login)
  router.post('/roles/read', controller.roles.index.readRole)
  router.post('/roles/add', controller.roles.index.addRole)
  router.post('/roles/update', controller.roles.index.updateRole)
  router.post('/roles/delete', controller.roles.index.deleteRole)
}
