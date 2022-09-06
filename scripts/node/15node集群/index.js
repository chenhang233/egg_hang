const cluster = require('cluster')
const http = require('http')
const numCPUs = require('os').cpus().length
const child_process = require('child_process')
if (cluster.Worker) {
  for (let i = 0; i < numCPUs; i++) {
    const child = child_process.fork()
    child.on('exit', function (code, signal) {
      console.log('worker ' + code, signal + ' died')
    })
  }
} else {
  http
    .createServer(function (req, res) {
      res.writeHead(200)
      res.end('hello world\n')
    })
    .listen(8000)
}
