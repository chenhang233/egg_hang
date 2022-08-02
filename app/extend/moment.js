const moment = require('moment')
exports.relativeTime = (time) => moment(new Date(time * 1000)).fromNow()
exports.cnTime = (time) => {
  return moment(new Date(+time)).format('YYYY-MM-DD hh:mm:ss')
}
