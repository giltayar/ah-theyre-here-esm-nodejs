const {prefix} = require('./prefix.js')

module.exports.greet = function(who) {
  return `${prefix}, ${who}!`
}
