import fs from 'fs'
import { resolvePath } from '../utils/helpers'

export type ReadFileType = (path: string) => Promise<string>

// get file content by its path
const readFile: ReadFileType = (path) =>
  new Promise((resolve, reject) => {
    fs.readFile(resolvePath(path), 'utf8', (err, content) => {
      if (err) reject(err)
      resolve(content)
    })
  })

export default readFile