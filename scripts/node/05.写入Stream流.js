const fs = require('fs')
const data = 'test'
const writeStream = fs.createWriteStream('output.txt')

writeStream.write(data, 'utf8')

writeStream.end()

writeStream.on('finish', () => {
  console.log('写入文件完成')
})

writeStream.on('error', (e) => {
  console.log('错误', e)
})
