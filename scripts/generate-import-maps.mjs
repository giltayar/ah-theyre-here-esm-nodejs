import {promises as fs} from 'fs'
import {generateImportMapForProjectPackage} from '@jsenv/node-module-import-map'

async function main() {
  await generateImportMapForProjectPackage({
    projectDirectoryUrl: new URL('..', import.meta.url),
    includeDevDependencies: false,
    importMapFile: true,
    importMapFileRelativeUrl: './dist/import-map.json',
  })
  const importMap = await fs.readFile('./dist/import-map.json', 'utf-8')
  const importMapsHtml = await fs.readFile(
    './src/03-esm-is-browser-compatible/import-maps.html',
    'utf-8',
  )
  const importMapsHtmlWithImportMap = importMapsHtml.replace('$$IMPORT_MAP$$', importMap)

  await fs.writeFile('./dist/import-maps.html', importMapsHtmlWithImportMap)
}

main().catch((err) => {
  console.error(err.toString())

  process.exit(1)
})
