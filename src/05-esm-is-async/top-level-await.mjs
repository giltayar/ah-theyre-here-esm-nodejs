import {promises as fs} from 'fs'
const {someOsSpecificModule} = process.platform === 'win32'
  ? await import('./windows-stuff')
  : await import('./unix-stuff')

const config = JSON.parse(await fs.readFile('./some-file.json'))

export function foo() {
  // ...
  someOsSpecificModule(config.someConfigParam)
  // ...
}
