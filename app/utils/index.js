const { codeMap, letterKeys } = require('../../config/config.static')
module.exports = {
  error(message) {
    const str = codeMap[message]
    if (!str) {
      return { code: 1, message: '未配置错误信息' }
    }
    return { code: 1, message: str }
  },
  success(message = 200, data = []) {
    const str = codeMap[message]
    return { code: 0, message: str, data }
  },
  UUID(init) {
    if (init && !(typeof init === 'string')) {
      throw new Error('UUID 传入字符串')
    }
    let res = ''
    let i = -1
    const getRandom = (res) => {
      if (res.length >= 30) return res
      let num = Math.floor(Math.random() * 28)
      res +=
        num + letterKeys[num] + letterKeys[num + 1] ??
        '#' + letterKeys[num - 1] ??
        '*'
      if (init) {
        res += init.split('')[++i] ?? '%'
      }
      return getRandom(res)
    }
    return getRandom(res)
  },
}
