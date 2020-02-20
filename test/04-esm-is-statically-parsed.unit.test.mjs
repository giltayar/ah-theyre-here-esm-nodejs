import mocha from 'mocha'
const {describe, it} = mocha
import chai from 'chai'
const {expect} = chai
import executeModule from './execute-module.mjs'

describe('esm-is-statically-parsed (unit)', function() {
  it('cjs loads even if dependencies are bad', async () => {
    expect(
      await executeModule('04-esm-is-statically-parsed/module-with-bad-deps.js').catch(err =>
        err.toString().split('\n'),
      ),
    )
      .to.include('TypeError: greet is not a function')
      .and.to.include('Error: module "who" loaded')
  })

  it('esm should not load if dependencies are bad', async () => {
    expect(
      await executeModule('04-esm-is-statically-parsed/module-with-bad-deps.mjs').catch(err =>
        err.toString().split('\n'),
      ),
    ).to.include(
      "SyntaxError: The requested module './greet.mjs' does not provide an export named 'greet'",
    )
  })

  it('cjs should load the one with good deps', async () => {
    expect(
      await executeModule('04-esm-is-statically-parsed/good/module-with-good-deps.js'),
    ).to.eql(['module "who" loaded', 'Hello, world'])
  })

  it('esm should not load if dependencies are bad', async () => {
    expect(
      await executeModule('04-esm-is-statically-parsed/good/module-with-good-deps.mjs'),
    ).to.eql(['module "who" loaded', 'Hello, world'])
  })
})
