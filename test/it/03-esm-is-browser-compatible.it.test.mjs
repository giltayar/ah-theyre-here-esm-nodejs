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

describe('esm-is-browser-compatible (it)', function() {
  /** @type puppeteer.Browser */
  let browser
  before(async () => (browser = await puppeteer.launch()))
  after(() => browser.close())

  let staticBaseUrl
  before(async () => {
    const app = fastify()
    app.register(fastifyStatic, {root: __dirname})

    staticBaseUrl = await app.listen()
  })

  it('browsers support esm', async () => {
    const page = await browser.newPage()
    await page.goto(new URL(`${staticBaseUrl}/resources/imports-module.html`, import.meta.url))

    const element = await page.$('#root')

    expect(await element.evaluate(n => n.textContent)).to.equal('Hello, world')
  })
})
