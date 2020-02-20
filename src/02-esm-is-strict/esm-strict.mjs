import assert from 'assert'

try {
  x = 'x is global' //eslint-disable-line
} catch (err) {
  assert(err instanceof ReferenceError)
  console.log('x not defined')
}

try {
  this.y = '"this" is defined'
} catch (err) {
  assert(err instanceof TypeError)
  console.log('"this" is undefined')
}
