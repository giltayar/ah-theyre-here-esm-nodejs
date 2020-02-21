const {greet} = require('dual-mode-package') // eslint-disable-line node/no-extraneous-require
const {world} = require('dual-mode-package/world') // eslint-disable-line node/no-missing-require

console.log(greet(world()))
