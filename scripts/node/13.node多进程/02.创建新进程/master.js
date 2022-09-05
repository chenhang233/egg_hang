const child_process = require('child_process')

for (let index = 0; index < 5; index++) {
  const workProcess = child_process.spawn('node', ['support.js', index])
  workProcess.stdout.on('data', (chunk) => {
    console.log('stdout: ' + chunk)
  })
  workProcess.stderr.on('data', (data) => {
    console.log('stderr: ' + data)
  })

  workProcess.on('close', (code) => {
    console.log('子进程已退出，退出码 ' + code)
  })
}
