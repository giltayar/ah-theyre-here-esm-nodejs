import mocha from 'mocha'
const {describe, it} = mocha
import chai from 'chai'
const {expect} = chai
import executeModule from './execute-module.mjs'

describe('migration (unit)', function() {
  it('original CJS module works', async () => {
    expect(await executeModule('08-migration/original/main.js')).to.eql(['Hello, world'])
  })

  it('Top down (import style) migration works', async () => {
    expect(await executeModule('08-migration/top-down/main-import.mjs')).to.eql(['Hello, world'])
  })

  it('Top down (require style) migration works', async () => {
    expect(await executeModule('08-migration/top-down/main-import.mjs')).to.eql(['Hello, world'])
  })

  it('Bottom up migration works', async () => {
    expect(await executeModule('08-migration/bottom-up/main.js')).to.eql(['Hello, world'])
  })
})
