/* eslint valid-jsdoc: "off" */

'use strict'
const path = require('path')

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = (appInfo) => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {})
  // 将public下的静态资源重定向到根目录下
  config.static = {
    prefix: '/static',
    dir: path.join(appInfo.baseDir, 'app/public'),
    dynamic: true,
    preload: false,
    maxAge: 31536000,
    buffer: true,
  }

  // websocket
  config.io = {
    init: {}, // passed to engine.io
    namespace: {
      '/': {
        connectionMiddleware: ['connection'],
        packetMiddleware: [], // 针对消息的处理暂时不实现
      },
      // '/example': {
      //   connectionMiddleware: [],
      //   packetMiddleware: [],
      // },
    },
  }
  // 添加 view 配置
  config.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.tpl': 'nunjucks',
    },
  }
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1659331422753_9166'
  config.security = {
    csrf: { enable: false },
    xframe: {
      enable: false,
    },
    // domainWhiteList: ['*'],
  }
  // cors 跨域
  config.cors = {
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
    credentials: true,
    origin: '*', // 允许的请求来源（* 表示允许所有的IP的请求 ）
  }
  // token
  config.jwt = {
    secret: '_1659331422753_9166', //自定义 token 的加密条件字符串
  }
  // add your middleware config here
  config.middleware = ['auth']
  config.auth = {
    whiteurlList: ['/users/login', '/users/register', '/users/getToken', '/'],
  }
  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  }

  return {
    ...config,
    ...userConfig,
  }
}
