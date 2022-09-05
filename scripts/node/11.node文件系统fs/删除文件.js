const fs = require('fs')

fs.unlink('../input.txt.gz', (err) => {
  if (err) console.log(err)
  console.log('删除成功')
})
