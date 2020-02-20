const {who} = require('./who.js')
const {greet} = require('./greet.js')

module.exports.hello = greet(who)
