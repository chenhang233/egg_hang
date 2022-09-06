const http = require('http')
const fs = require('fs')

const postData = JSON.stringify({
  msg: 'Hello World!',
})
let index = 1
const writeStream = fs.createWriteStream('17.output.json')
const data = []
let timerId = setInterval(() => {
  const options = {
    hostname: '127.0.0.1',
    port: 7001,
    path: `/test/getLoginRecordInfo?pageSize=5&pageNumber=${index}`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    userAgent: '*',
  }
  console.log('request start')
  const req = http.request(options, (res) => {
    res.setEncoding('utf8')
    res.on('data', (chunk) => {
      const response = JSON.parse(chunk)
      console.log(response.message, 'message')
      console.log(response.data, 'data')
      if (response.code === 1 || !response.data) {
        console.log(response, 'response')
        writeStream.write(JSON.stringify(data), 'utf8')
        writeStream.end()
        return clearInterval(timerId)
      }
      data.push(...response.data)
    })
    res.on('end', () => {
      console.log('No more data in response.')
    })
  })

  req.on('error', (err) => {
    console.log('req err', err)
  })

  writeStream.on('finish', () => {
    console.log('write finish')
  })

  writeStream.on('error', (e) => {
    console.log('write error', e)
  })

  req.write(postData)
  req.end()
  index++
}, 200)
