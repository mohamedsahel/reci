import fs from 'fs'
import { resolvePath } from '../utils/helpers'

export type CreateFileType = (path: string, content?: string) => Promise<string>

// create a file with the given path, and set content to it
const createFile: CreateFileType = (path, content = '') => {
  return new Promise<string>((resolve, reject) => {
    fs.writeFile(resolvePath(path), content, (err) => {
      if (err) return reject(err)
      resolve(path + '/')
    })
  })
}


export default createFile
