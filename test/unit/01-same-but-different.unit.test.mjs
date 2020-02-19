'use strict'
import mocha from 'mocha'
const {describe, it} = mocha
import chai from 'chai'
const {expect} = chai
import executeModule from './execute-module.mjs'

describe('what-are-es-modules (unit)', function() {
  it('cjs-main.js', async () => {
    expect(await executeModule('01-what-are-es-modules/cjs-main.js')).to.eql(['9', '5'])
  })
  it('esm-main.js', async () => {
    expect(await executeModule('01-what-are-es-modules/esm-main.mjs')).to.eql(['9', '5'])
  })
})
