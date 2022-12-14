const path = require('path')
module.exports = (appInfo) => {
  return {
    mysql: {
      // 单数据库信息配置
      client: {
        // host
        host: '127.0.0.1',
        // 端口号
        port: '3306',
        // 用户名
        user: 'root',
        // 密码
        password: '123456',
        // 数据库名
        database: 'egg_table',
      },
      app: true,
      agent: false,
    },
    static: {
      prefix: '/static',
      dir: [
        path.join(appInfo.baseDir, 'app/public/static'),
        // path.join(appInfo.baseDir, 'backstage/dist'),
      ],
      maxAge: 31536000,
    },
  }
}
