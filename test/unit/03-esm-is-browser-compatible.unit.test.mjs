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
  before(
    async () =>
      (browser = await puppeteer.launch({
        args: ['--enable-experimental-web-platform-features'],
      })),
  )
  after(() => browser.close())

  let staticBaseUrl
  /** @type fastify.FastifyInstance */ let app
  before(async () => {
    app = fastify()
    app.register(fastifyStatic, {
      root: path.join(__dirname, '../../'),
    })
    app.register(fastifyStatic, {
      decorateReply: false,
      prefix: '/dist/node_modules',
      root: path.join(__dirname, '../../node_modules'),
    })
    staticBaseUrl = await app.listen()
  })
  after(() => app.close())

  it('browsers support esm', async () => {
    const page = await browser.newPage()
    let consoleLogs = []
    page.on('console', msg => consoleLogs.push(msg.text()))
    await page.goto(
      new URL(
        `${staticBaseUrl}/src/03-esm-is-browser-compatible/imports-module.html`,
        import.meta.url,
      ),
    )

    expect(consoleLogs).to.eql(['Hello, world'])
  })

  it('browsers support bare-specifiers with importmap', async () => {
    const page = await browser.newPage()
    let consoleLogs = []
    page.on('console', msg => consoleLogs.push(msg.text()))
    await page.goto(new URL(`${staticBaseUrl}/dist/import-maps.html`, import.meta.url))

    expect(consoleLogs).to.eql([(await import('mjs-example')).hello])
  })

  it('node supports same esm code as browsers', async () => {
    expect(await executeModule('03-esm-is-browser-compatible/imports-module.mjs')).to.eql([
      'Hello, world',
    ])
  })

  it('node supports only paths that browsers support', async () => {
    expect(await executeModule('03-esm-is-browser-compatible/only-relative-paths.mjs')).to.eql([
      'index.mjs and package.json "main" not supported',
      'direct import of index.mjs',
      'direct import of main.mjs',
    ])
  })
})
