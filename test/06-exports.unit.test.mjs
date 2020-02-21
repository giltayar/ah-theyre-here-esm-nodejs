import mocha from 'mocha'
const {describe, it} = mocha
import chai from 'chai'
const {expect} = chai
import executeModule from './execute-module.mjs'

describe('exports (unit)', function() {
  it('can import an ESM module with exports', async () => {
    expect(await executeModule('06-exports/use-package-with-exports.mjs')).to.eql(['Hello, world!'])
  })

  it('can import a CJS module with exports', async () => {
    expect(await executeModule('06-exports/use-package-with-exports.js')).to.eql(['Hello, world!'])
  })

  it('cannot import a not-declated subpath in an ESM module with exports', async () => {
    expect(
      await executeModule('06-exports/try-override-exports.mjs').catch(err => err.message),
    ).to.include("not define a './prefix.mjs' subpath")
  })

  it('cannot import a not-declated subpath in a CJS module with exports', async () => {
    expect(
      await executeModule('06-exports/try-override-exports.js').catch(err => err.message),
    ).to.include("not define a './prefix.js' subpath")
  })
})
