import assert from 'assert'

async function main() {
  try {
    await import('./has-index-and-package-json')
  } catch (error) {
    assert.strictEqual(error.code, 'ERR_UNSUPPORTED_DIR_IMPORT')
    console.log('index.mjs and package.json "main" not supported')
  }
  await import('./has-index-and-package-json/index.mjs')
  await import('./has-index-and-package-json/main.mjs')
}

main().catch((err) => {
  console.error(err.toString())

  process.exit(1)
})
