const fs = require('fs')
let data = ''
const readStream = fs.createReadStream('input.txt')

readStream.setEncoding('utf8')
readStream.on('data', (chunk) => {
  data += chunk
})

readStream.on('error', function (err) {
  console.log(err.stack)
})

readStream.on('end', () => {
  console.log(data, 'end')
})
