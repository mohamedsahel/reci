import fs from 'fs'
import { resolvePath } from '../utils/helpers'


export type CreateFolderType = (path: string) => Promise<string>

//create a folder/direction with the given path
const createFolder: CreateFolderType = (path) => {
  return new Promise((resolve, reject) => {
    fs.mkdir(resolvePath(path), { recursive: true }, (err) => {
      if (err) return reject(err)
      resolve(path + '/')
    })
  })
}

export default createFolder
