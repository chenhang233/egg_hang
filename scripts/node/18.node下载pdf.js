const http = require('http')
const fs = require('fs')
const p = 'D:\\自主学习\\电子书'
let dirpath = []
const server = http.createServer((req, res) => {
  const path = req.url
  const filename = decodeURIComponent(path.split('/')[1])
  console.log(filename, 'filename', path, 'path')
  console.log(dirpath)
  if (path === '/') {
    fs.readdir(p, (err, arr) => {
      dirpath = arr
      res.setHeader('content-type', 'text/html;charset=utf-8')
      res.write(arr.join('----------'))
      res.end()
    })
  } else if (dirpath.includes(filename)) {
    console.log(1111)
    res.setHeader('content-type', 'application/pdf')
    // res.setHeader('content-disposition', `attachment;filename=${filename}.pdf`)
    const f = fs.createReadStream(p + '\\' + filename)
    f.on('data', (data) => {
      res.write(data)
    })
    f.on('end', () => {
      res.end()
      console.log('over')
    })
  }
})

server.listen(8000, () => {
  console.log('server is run..')
})
