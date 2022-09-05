const buffer = Buffer.from('chenhang', 'binary')

console.log(buffer.toString('base64'))
// 创建一个长度为 10、且用 0 填充的 Buffer。
const buf2 = Buffer.alloc(10)
// 写入缓冲区
const length = buf2.write('chenhang')
console.log(buf2.toString(), length, 'length')
