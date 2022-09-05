const util = require('util')

function fn() {
  return Promise.reject(null)
}

const callback = util.callbackify(fn)

callback((err, res) => {
  console.log(err)
})
function Base() {
  this.name = 'base'
  this.base = 1991
  this.sayHello = function () {
    console.log('Hello ' + this.name)
  }
}
Base.prototype.showName = function () {
  console.log(this.name)
}
function Sub() {
  this.name = 'sub'
}
util.inherits(Sub, Base)
var objBase = new Base()
objBase.showName()
objBase.sayHello()
console.log(objBase)
var objSub = new Sub()
objSub.showName()
//objSub.sayHello();
console.log(objSub)
