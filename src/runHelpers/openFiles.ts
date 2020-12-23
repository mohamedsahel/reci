import { execCommand } from '../utils/helpers'

export type OpenFilesType = (paths: string | string[]) => void

// open the given path file
const openFiles: OpenFilesType = async (paths) => {
  try {
    if (typeof paths === 'string') await execCommand(`code -r ${paths}`)
    else if (Array.isArray(paths)) await execCommand(`code -r ${paths.join(' ')}`)
    else throw paths + ' is not a valide path'
  } catch (err) {
    throw err
  }
}

export default openFiles
