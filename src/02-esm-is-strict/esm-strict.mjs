try {
  x = 4            //eslint-disable-line
} catch (err) {
  console.log(err instanceof ReferenceError ? 'x not defined' : err)
}

try {
  this.y = 42
} catch (err) {
  console.log(err instanceof TypeError ? 'this is undefined' : err)
}
