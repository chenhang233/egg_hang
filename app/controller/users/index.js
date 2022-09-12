const { Controller } = require('egg')
const { error, UUID, success } = require('../../utils/index')
const { admin } = require('../../../config/config.static')
const fs = require('fs')
const path = require('path')
class IndexController extends Controller {
  async index() {}
  async register() {
    const ctx = this.ctx
    const { username, password } = ctx.request.body
    if (!username || !password) {
      return (ctx.body = error(204))
    }
    const prevData = await ctx.service.sql.selectByName('adminuser', username)

    if (prevData) return (ctx.body = error(202))
    const uuid = UUID(password)
    const conn = await ctx.app.mysql.beginTransaction()
    try {
      await conn.insert('adminuser', {
        uuid,
        account: username,
        password,
        roleId: 1,
      })
      await conn.insert('adminuserinfo', {
        uuid,
        avatar:
          'https://img1.baidu.com/it/u=482361127,3010567847&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1659459600&t=297eed9ee7882554263764f96cc8ae73',
        registerTime: ctx.app.mysql.literals.now,
      })
      await conn.commit()
      return (ctx.body = success(200, {
        username: username,
        password: password,
      }))
    } catch (error) {
      await conn.rollback()
      throw error
    }
  }
  async login() {
    const ctx = this.ctx
    const { username, password, captcha } = ctx.request.body
    if (!username || !password || !captcha) {
      return (ctx.body = error(204))
    }
    console.log(ctx.session, 'session')
    console.log(ctx.cookies.get('code'))
    const prevData = await ctx.service.sql.selectByName('adminuser', username)
    if (!prevData) return (ctx.body = error(204))
    if (prevData.password !== password) return (ctx.body = error(204))
    const infoData = await ctx.service.sql.selectByUUID(
      'adminuserinfo',
      prevData.uuid
    )
    // const cannotKeys = ctx.service.users.cannotKeys()
    const userinfo = { ...prevData, ...infoData, username: username }
    const token = ctx.service.users.setToken(userinfo)
    const refreshToken = ctx.service.users.setRefreshToken(userinfo)
    await ctx.service.users.insertLoginAction({
      uuid: prevData.uuid,
      loginTime: Date.now(),
    })
    await ctx.service.cache.hashSetUUID(token, prevData.uuid)
    const allUUID = await ctx.service.cache.hashGETUUIDAll()
    this.logger.info(allUUID, 'login remain UUID')
    return (ctx.body = success(200, {
      // menu: { menuInfo: menus, router: routeArr },
      token,
      refreshToken,
    }))
  }
  async logout() {
    try {
      const ctx = this.ctx
      const { uuid, logoutTime } = ctx.request.body
      // const token = this.ctx.headers.authorization?.substring(7)
      if (!uuid) {
        return (ctx.body = error(508))
      }
      const infoArr = await ctx.service.sql.selectAll('logininfo')
      infoArr.sort((a, b) => b.id - a.id)
      const id = infoArr.find((obj) => obj.uuid === uuid).id
      const err = await ctx.service.users.updateLogoutAction(logoutTime, id)
      if (err) return (ctx.body = err)
      const allUUID = await ctx.service.cache.hashGETUUIDAll()
      for (const key in allUUID) {
        if (allUUID[key] === uuid) {
          await ctx.service.cache.hashRemoveUUID(key)
        }
      }
      this.logger.info(
        uuid,
        'UUID',
        await ctx.service.cache.hashGETUUIDAll(),
        'out remain'
      )
      return (ctx.body = success(200))
    } catch (error) {
      console.dir(error, 'error')
    }
  }
  async getUserMenus() {
    const ctx = this.ctx
    const token = this.ctx.headers.authorization.substring(7)
    const UUID = await ctx.service.cache.hashGetUUID(token)
    const user = await ctx.service.sql.selectByUUID('adminuser', UUID)
    const menus = await ctx.service.sql.selectByUUID(
      'adminuserrole',
      user.roleId
    )
    const routerKeysArr = menus.routerId ? menus.routerId.split(',') : [0]
    let routeArr = await ctx.service.sql.selectAll('adminuserrouter')
    if (admin.includes(routerKeysArr[0])) {
      routeArr.forEach((obj) => (obj.auth = true))
    } else {
      routeArr.forEach(
        (obj) => (obj.auth = routerKeysArr.includes(String(obj.uuid)))
      )
    }
    const cannotKeys = await ctx.service.users.cannotKeys()
    for (let k in menus) {
      if (cannotKeys.includes(k)) delete menus[k]
    }
    for (let obj of routeArr) {
      for (let j in obj) {
        if (cannotKeys.includes(j)) delete obj[j]
      }
    }
    return (ctx.body = success(200, {
      menu: { menuInfo: menus, router: routeArr },
    }))
  }
  async getToken() {
    const ctx = this.ctx
    const reqtoken = ctx.headers.authorization.substring(7)
    const UUID = await ctx.service.cache.hashGetUUID(reqtoken)
    let { refreshToken } = ctx.request.body
    if (!refreshToken) return (ctx.body = error(217))
    if (!refreshToken.startsWith('Bearer ')) return (ctx.body = error(209))
    refreshToken = refreshToken.substring(7)
    const { details, username } =
      ctx.service.users.verifyRefreshToken(refreshToken)
    await ctx.service.cache.hashRemoveUUID(reqtoken)
    if (!UUID) {
      details && (details.Refresh = false)
      ctx.status = 403
    }
    if (!username || !details || !details.Refresh) {
      return (ctx.body = error(218, { code: 403, uuid: UUID }))
    }
    const token = ctx.service.users.setToken({
      details: details,
      username: username,
    })
    await ctx.service.cache.hashSetUUID(token, UUID)
    return (ctx.body = success(200, { token }))
  }
  async getUserInfo() {
    const ctx = this.ctx
    const token = ctx.headers.authorization.substring(7)
    const UUID = await ctx.service.cache.hashGetUUID(token)
    const adminuser = await ctx.service.sql.selectByUUID('adminuser', UUID)
    if (!adminuser) return (ctx.body = error(207))
    const adminuserinfo = await ctx.service.sql.selectByUUID(
      'adminuserinfo',
      adminuser.uuid
    )
    const userinfo = { ...adminuser, ...adminuserinfo }
    userinfo.username = userinfo.account
    if (userinfo.avatar && !/^http/.test(userinfo.avatar)) {
      userinfo.avatar = await this.service.users.getBASE64Image(userinfo.avatar)
    }
    delete userinfo.account
    const cannotKeys = ['id', 'roleId', 'routerId', 'routerFnId', 'interfaceId']
    for (let k in userinfo) {
      if (cannotKeys.includes(k)) delete userinfo[k]
    }
    return (ctx.body = success(200, userinfo))
  }
  async setUserInfo() {
    const ctx = this.ctx
    const token = ctx.headers.authorization.substring(7)
    const body = ctx.request.body
    const uploadArr = ['sex', 'phone', 'address', 'introduction', 'nickname']
    if (!body.uuid) return (ctx.body = error(201))
    const {
      details: {
        info: { uuid },
      },
    } = ctx.service.users.verifyToken(token)
    if (uuid !== body.uuid) return (ctx.body = error(513))
    const updateObj = {}
    for (const key in body) {
      if (uploadArr.includes(key)) {
        updateObj[key] = body[key]
      }
    }
    updateObj.uuid = body.uuid
    const err = await ctx.service.users.updateUserInfo(
      'adminuserinfo',
      updateObj
    )
    if (err) return (ctx.body = err)
    return (ctx.body = success(200))
  }
  async uploadAvatar() {
    const ctx = this.ctx
    if (!ctx.request.files) return (ctx.body = error(201))
    const avatarFile = ctx.request.files[0]
    const token = ctx.headers.authorization.substring(7)
    let UUID = await ctx.service.cache.hashGetUUID(token)
    const adminuser = await ctx.service.sql.selectByUUID('adminuserinfo', UUID)
    const p = path.join(__dirname + '../../../uploads/') + Date.now()
    const file = fs.readFileSync(avatarFile.filepath)
    const prevRedis = await ctx.service.cache.hashGETUUIDAll()
    try {
      fs.writeFileSync(p, file)
      if (adminuser.avatar && fs.readFileSync(adminuser.avatar)) {
        fs.unlink(adminuser.avatar, (err) => {})
      }
    } catch {}
    for (let k in prevRedis) {
      await ctx.service.cache.hashSetUUID(k, prevRedis[k])
    }
    const updateObj = {
      uuid: UUID,
      avatar: p,
    }
    await ctx.service.users.updateUserInfo('adminuserinfo', updateObj)
    ctx.body = success(200)
  }
  async getSvgCaptcha() {
    const ctx = this.ctx
    let { text, data: SVG } = await this.service.users.getCaptcha()
    const Returnobj = {
      rect: {
        fill: null,
      },
      path: [],
      text: null,
    }
    const matchRect = /<rect/
    const matchEnd = /\/>/
    const matchPath = /<path/
    const matchEnd2 = /<\/svg>/
    const matchStroke = /stroke/
    const matchFill = /fill/
    const { index } = matchRect.exec(SVG)
    const { index: index2 } = matchEnd.exec(SVG)
    const { index: index3 } = matchPath.exec(SVG)
    // console.log(index, ' matchRect.exec(SGV)')
    const rectStr = SVG.slice(index, index2 + 2)
    const { index: index4 } = matchFill.exec(rectStr)
    Returnobj.rect.fill = rectStr
      .slice(index4, index4 + 14)
      .split('=')[1]
      .split('"')[1]
    const pathSVG = SVG.slice(index3).replace(matchEnd2, '')
    const keywords = ['d', 'stroke', 'fill']
    const pathArr = pathSVG.split('<path')
    if (!pathArr[0]) pathArr.shift()
    const pathArr2 = pathArr.map((str) => {
      const strArr = str.split('=')
      strArr.forEach((v, i) => {
        keywords.forEach((s) => {
          if (v.endsWith(s) && !matchStroke.test(v)) {
            strArr[i] = strArr[i].split(' ')
          } else if (v.endsWith(s) && matchStroke.test(v)) {
            strArr[i] = strArr[i].split('"')
            strArr[i][2] && (strArr[i][2] = strArr[i][2].trim())
          }
        })
        if (i === strArr.length - 1)
          strArr[i] = [strArr[i].replace(matchEnd, '')]
        if (!strArr[i][0]) strArr[i].shift()
      })
      return strArr
    })
    pathArr2.forEach((outarr) => {
      outarr.forEach((arr, i) => {
        if (keywords.includes(arr[arr.length - 1]) && arr.length > 1) {
          outarr[i - 1].push(arr[0])
          arr.shift()
        } else if (arr.length === 1 && i > 0) {
          outarr[i - 1].push(arr[0].split('"')[1])
          outarr.pop()
        }
      })
    })
    pathArr2.forEach((outarr) => {
      const obj = {}
      outarr.forEach((innerArr) => {
        obj[innerArr[0]] = innerArr[1]
      })
      Returnobj.path.push(obj)
    })
    Returnobj.text = text
    ctx.response.type = 'image/svg+xml'
    ctx.body = success(200, Returnobj)
  }
}

module.exports = IndexController
