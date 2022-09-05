const fs = require('fs')
const buff = Buffer.alloc(1024)

fs.open('../input.txt', 'r+', (err, fd) => {
  if (err) {
    return console.error(err)
  }
  console.log('文件打开成功！')
  console.log(fd)
  fs.read(fd, buff, 0, buff.length, 0, (err, bytes) => {
    if (err) {
      console.log(err)
    }
    console.log(bytes + '  字节被读取')
    if (bytes > 0) {
      console.log(buff.subarray(0, bytes).toString())
    }
    fs.close(fd, function (err) {
      if (err) {
        console.log(err)
      }
      console.log('文件关闭成功')
    })
  })
})
