const {greet} = require('cjs-package-with-exports') // eslint-disable-line node/no-extraneous-require
const {world} = require('cjs-package-with-exports/world') // eslint-disable-line node/no-extraneous-require

console.log(greet(world()))
