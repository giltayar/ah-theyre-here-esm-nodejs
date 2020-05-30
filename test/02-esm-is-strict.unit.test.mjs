import mocha from 'mocha'
const {describe, it} = mocha
import chai from 'chai'
const {expect} = chai
import executeModule from './execute-module.mjs'

describe('esm-is-strict (unit)', function () {
  it('cjs', async () => {
    expect(await executeModule('02-esm-is-strict/cjs-not-strict.js')).to.eql([
      'x is global',
      '"this" is defined',
    ])
  })

  it('esm', async () => {
    expect(await executeModule('02-esm-is-strict/esm-strict.mjs')).to.eql([
      'x not defined',
      '"this" is undefined',
    ])
  })

  it('esm with js extension', async () => {
    expect(await executeModule('02-esm-is-strict/js-here-is-ok/esm-strict.js')).to.eql([
      'x not defined',
      'this is undefined',
    ])
  })
})
