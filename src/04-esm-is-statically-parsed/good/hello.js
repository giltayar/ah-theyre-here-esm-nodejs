const {who} = require('./who.js')
const {greetings} = require('./greet.js')

module.exports.hello = greetings(who)
