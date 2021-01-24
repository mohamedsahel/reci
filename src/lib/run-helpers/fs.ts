import isValidePath from 'is-valid-path'
import chokidar from 'chokidar'
const FS  = require('fs').promises
const PATH = require('path')


import { execCommand, handleError } from '../../utils/helpers'
import { getCwd } from '../../utils/cwd'


/***************
 1 - Create
 2 - Edit
 3 - Read
 4 - Delete
**************/

class Fs {
  private hasExtension = (path: string) => {
    const base = PATH.basename(path)

    return  /[^\\/]+\.[^\\/]+$/.test(base)
  }

  private isExists = async (path: string) => {
    try {
      await FS.access(path)
      return true
    } catch (error) {
      return false
    }
  }

  private stats = async (path: string) => {
    const stats = await FS.stat(path)

    return {
      isFile: stats.isFile(),
      isDirectory: stats.isDirectory()
    }
  }

  /************
    Create
  ************/
  createFile = async (path: string, content?: string) => {
    await FS.writeFile(path, content)
      .catch(handleError(`create file [${path}]`))

    return path
  }

  createFolder = async (path: string) => {
    FS.mkdir(path, { recursive: true })
      .catch(handleError(`create folder [${path}]`))

    return path
  }

  create = async (object: any, parentPath: string = getCwd()) => {
    if(!object) return

    if(typeof object === 'string') {
      if(this.hasExtension(object)) {
        this.createFile(object)
        return
      }

      this.createFolder(object)
      return
    }


    if(Array.isArray(object)) {
      object.forEach(subObject => this.create(subObject, parentPath))
      return
    }


    if(typeof object === 'object') {
      if(!isValidePath(object.path)) {
        handleError(`Valid path expected: receive (${object.path})`)()
      }

      if(object.type === 'folder' || object.hasOwnProperty('children')) {
          const folderPath = await this.createFolder(PATH.join(parentPath, object.path))

          await this.create(object.children, folderPath)

          return
      }

      if(object.type === 'file' || object.hasOwnProperty('content')) {
        this.createFile(PATH.join(parentPath, object.path), object.content)

        return
      }

      if(this.hasExtension(object.path)) {
        this.createFile(PATH.join(parentPath, object.path), object.content)

        return
      }

      this.createFolder(object.path)
    }
  }


  /************
    Read
  ************/
  private read = async (path: string, method: Function) => {
    const isExists = await this.isExists(path)
    if(!isExists) return

    const content = await method(path, 'utf8').catch(handleError(`read file [${path}]`))

    return content
  }

  readFile = async (path: string) => this.read(path, FS.readFile)
  readDir = async (path: string) => this.read(path, FS.readdir)



  /************
    Edit
  ************/
 edit = async (path: string, editConent: any) => {
   const isExists = await this.isExists(path)
   if(!isExists) return

   try {
     const oldConent = await this.readFile(path)
     const newConent = await editConent(oldConent)

     await this.create({
       path,
       type: 'file',
       content: newConent
      })

      return newConent
    } catch (err) {
      handleError(`edit file [${path}]`)
    }
  }



  /************
    Delete
  ************/
 private deletePath = async (path: string) => {
   const isExists = await this.isExists(path)
   if(!isExists) return

   const stats = await this.stats(path)

   if(stats.isFile) {
     await FS.unlink(path).catch(handleError(`delete file [${path}]`))
    }
    else if(stats.isDirectory) {
      await FS.rmdir(path, { recursive: true }).catch(handleError(`delete folder [${path}]`))
    }
  }

  delete =async (paths: any) => {
    if(typeof paths === 'string') {
      await this.deletePath(paths)

      return
    }

    if(Array.isArray(paths)) {
      await Promise.all(paths.map(async path => await this.deletePath(path)))

      return
    }
  }



  /************
    Open
  ************/
  open = async (paths: string | string[]) => {
    try {
      if (typeof paths === 'string') await execCommand(`code -r ${paths}`)
      else if (Array.isArray(paths)) await execCommand(`code -r ${paths.join(' ')}`)
    } catch (err) {
      handleError(`open files [${paths}]`)(err)
    }
  }



  /************
    Watch (add - change - unlink)
  ************/
 watch = (path, options?) => chokidar.watch(path, {
   persistent: true,
   ignoreInitial: true,
   ...options
  })



  /************
    Copy files
  ************/
  copy = async (srcDir, destDir, files) => {
    const isDestExist = await this.isExists(destDir)

    if(!isDestExist) {
      await this.create({
        path: destDir,
        type: 'folder',
      })
    }

    return Promise.all(files.map(f => {
      return FS.copyFile(PATH.join(srcDir, f), PATH.join(destDir, f))
    }))
  }
}



export default new Fs()