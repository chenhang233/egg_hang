// scripts/start.js
const os = require('os')
const child_process = require('child_process')

const cores = os.cpus().length
const worker = cores === 1 ? 2 : cores
console.log(worker, 'worker数量')
const command = 'npm'
const argv = ['start', '--', `--workers=${worker}`]

const child = child_process.spawn(command, argv)
child.stdout.on('data', (data) => {
  console.log(`standard output: ${data}`)
})

child.stderr.on('error', (data) => {
  console.error(`stderr: ${data}`)
})
