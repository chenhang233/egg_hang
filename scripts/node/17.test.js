const http = require('http')
const fs = require('fs')

const postData = JSON.stringify({
  dictCode: 'prod.base',
  microSrv_client: 'assetgenmng',
})
const options = {
  hostname: 'https://qiuer.org',
  port: 443,
  path: `/do/3672.24`,
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  cookie:
    'INGRESSCOOKIE=abf6ec216314a1605e2abee9f3aae35c; _oauth2_proxy=a1M1JfeylImiOlXmdg8T84xyx7FZLh63srmrIvPT08va-sgDQOkp9SG28e1C76it4N1GiR1XvFhOYlJlxuEPVzq3aWxykjcCDxmFxVRK9lDbFyPW2V8AximG7zv7e947eHUxWxdulICAB1b67kTg5Q8ZSH_Q2AixF7xMtj9PGPdtlyp_VFAC22V1RqmZoWQXMh3EPodcZsQFFsq6P8VlDpgTnK9cyQuYVdhNCirJMQl6Wt-oGl_vOFv_BHy9SHjr6z2ow3IPGyRcHPqzfFmQYpAJSsN5mMMqQwYyF0SDIOzfncJQwDBOJYFlZYN0F3ErHXX-ZSGBe7M2DN8QQzcMsdS-s5tZj53BwlMSkG3H17PffJFp-T-WBiRjg_YdT8mrtDgCrQLd5YCe7mDOapvLDNeBpeCcv8ttkdNka5V50cef45Okucm-lJXdMRAGxEGvJ9h63E1xu5CihGLEpXNGafkr5g2hZgUnPJc6IGz4otVcAp5yqQSQ7lyizz_z_5fnOEeXE8yWW2Tcxyxv3IC6qnrRBljAvZHoJuL-PaknB8hwj-XehV4oyRo_olfImQnN9rcBMIozqIJ43QHlyUevCfdAXSI-zXFwd5Hwqh1AE-bJfnUAw9GHtEVdX3cameQwYkE84jqd9gLGBrvwFjhqAbBaHK3tSUrVYy18W9rQUPipztk05RcZ6IYIW-ow6uC2kWAZrqnHv3AUEnyqIk_0wCRyfC_d6gMcxb2xD_8EJAbk-fcK|1662443794|mHcpzw9HYlz1_WUkhLFCyV9RFX8v6reHwpJHD4IyjMs=; JSESSIONID=37ADEEDA9C805DAF896A6A2D322F719E',
  userAgent: '*',
  origin: 'https://qiuer.org',
  referer: 'https://qiuer.org/',
}
console.log('request start')
const req = http.request(options, (res) => {
  res.setEncoding('utf8')
  res.on('data', (chunk) => {
    const response = JSON.parse(chunk)
    console.log(response, 'response')
  })
  res.on('end', () => {
    console.log('No more data in response.')
  })
})

req.on('error', (err) => {
  console.log('req err', err)
})

req.write(postData)
req.end()
