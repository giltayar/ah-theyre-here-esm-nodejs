import module from 'module'
const require = module.createRequire(import.meta.url)

const {greet} = require('./greet')

console.log(greet('world'))
