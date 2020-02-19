import assert from 'assert' // eslint-disable-line

try {
  x = 4            //eslint-disable-line
} catch (err) {
  assert(err instanceof ReferenceError)
  console.log('x not defined')
}

try {
  this.y = 42
} catch (err) {
  assert(err instanceof TypeError)
  console.log('this is undefined')
}
