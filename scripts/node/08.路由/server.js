const http = require('http')
const url = require('url')

function start(route) {
  http
    .createServer((req, res) => {
      const pathname = url.parse(req.url).pathname
      console.log('pathname', pathname)
      route(pathname)
      res.writeHead(200, { 'Content-Type': 'text/plain' })
      res.write('Hello World')
      res.end()
    })
    .listen(8888, () => {
      console.log('server running')
    })
}

exports.start = start
