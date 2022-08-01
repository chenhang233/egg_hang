const { codeMap } = require('../../config/config.static')
module.exports = {
  error(message) {
    const str = codeMap[message]
    if (!str) {
      return { code: 1, message: '未配置错误信息' }
    }
    return { code: 1, message: str }
  },
  success() {
    return { code: 0 }
  },
}
