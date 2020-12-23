import { resolvePath } from '../utils/helpers'
import execute from './execute'

export type ExecuteFileType = (path: string) => void

// esecute shell scripts files
const executeFile: ExecuteFileType = async (path) => {
  await execute('sh ' + resolvePath(path))
}

export default executeFile