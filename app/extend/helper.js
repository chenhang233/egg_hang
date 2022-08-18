const moment = require('moment')

module.exports = {
  parseMsg(action, payload = {}, metadata = {}) {
    const meta = Object.assign(
      {},
      {
        timestamp: Date.now(),
      },
      metadata
    )

    return {
      meta,
      data: {
        action,
        payload,
      },
    }
  },
  relativeTime(time) {
    moment(new Date(time * 1000)).fromNow()
  },
  cnTime(time) {
    return moment(new Date(+time)).format('YYYY-MM-DD hh:mm:ss')
  },
  transRouterChildren(routerArr, rootId) {
    const arr = []
    routerArr.forEach((route) => {
      if (route.parentId === rootId) {
        const children = this.transRouterChildren(routerArr, route.rootId)
        if (children.length > 0) {
          route.children = children
        }
        arr.push(route)
      }
    })
    return arr
  },
}
