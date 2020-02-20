import {fileURLToPath} from 'url'
import {once} from 'events'
import path from 'path'
import childProcess from 'child_process'
import getStream from 'get-stream'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default async function executeModule(pathToModuleInSrc) {
  const moduleProcess = childProcess.fork(path.join(__dirname, '../src', pathToModuleInSrc), [], {
    stdio: 'pipe',
  })

  const [[code], stdout, stderr] = await Promise.all([
    once(moduleProcess, 'exit'),
    getStream(moduleProcess.stdout),
    getStream(moduleProcess.stderr),
  ])

  if (code !== 0) {
    throw new Error(stdout + '\n' + stderr)
  } else {
    return stdout.split('\n').filter(Boolean)
  }
}
