const fs = require('fs')

fs.mkdir('/temp/test', { recursive: true }, (err) => {
  console.log(err)
})
