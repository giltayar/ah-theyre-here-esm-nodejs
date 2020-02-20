import {fileURLToPath} from 'url'
import path from 'path'
import mocha from 'mocha'
const {describe, it, before, after} = mocha
import chai from 'chai'
const {expect} = chai
import puppeteer from 'puppeteer'
import fastify from 'fastify'
import fastifyStatic from 'fastify-static'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
import executeModule from './execute-module.mjs'

describe('esm-is-browser-compatible (unit)', function() {
  /** @type puppeteer.Browser */ let browser
  before(async () => (browser = await puppeteer.launch()))
  after(() => browser.close())

  let staticBaseUrl
  /** @type fastify.FastifyInstance */ let app
  before(async () => {
    app = fastify()
    app.register(fastifyStatic, {
      root: path.join(__dirname, '../../src/03-esm-is-browser-compatible'),
    })
    staticBaseUrl = await app.listen()
  })
  after(() => app.close())

  it('browsers support esm', async () => {
    const page = await browser.newPage()
    let consoleLogs = []
    page.on('console', msg => consoleLogs.push(msg.text()))
    await page.goto(new URL(`${staticBaseUrl}/imports-module.html`, import.meta.url))

    expect(consoleLogs).to.eql(['Hello, world'])
  })

  it('esm', async () => {
    expect(await executeModule('03-esm-is-browser-compatible/imports-module.mjs')).to.eql([
      'Hello, world',
    ])
  })
})
