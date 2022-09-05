const fs = require('fs')

const zlib = require('zlib')

// fs.createReadStream('input.txt')
//   .pipe(zlib.createGzip())
//   .pipe(fs.createWriteStream('input.xtx.gz'))

// console.log('文件压缩')

fs.createReadStream('input.txt.gz')
  .pipe(zlib.createGunzip())
  .pipe(fs.createWriteStream('input.txt'))
console.log('文件解压')
