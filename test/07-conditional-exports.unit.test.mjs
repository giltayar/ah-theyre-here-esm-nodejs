import mocha from 'mocha'
const {describe, it} = mocha
import chai from 'chai'
const {expect} = chai
import executeModule from './execute-module.mjs'

describe('conditional-exports (unit)', function () {
  it('can import an ESM module with exports', async () => {
    expect(await executeModule('07-conditional-exports/use-package-with-exports.mjs')).to.eql([
      'Hello, world!',
    ])
  })

  it('can import a CJS module with exports', async () => {
    expect(await executeModule('07-conditional-exports/use-package-with-exports.js')).to.eql([
      'Hello, world!',
    ])
  })
})
