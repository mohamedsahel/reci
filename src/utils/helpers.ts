import PATH from 'path'
import { exec } from 'child_process'
const FS = require('fs').promises

import { getCwd } from './cwd'


export const resolvePath = (pathArg: string) => PATH.resolve(getCwd(), pathArg)

// helper fonction for excuting command line commands
export const execCommand = (cmd: string) => {
  return new Promise((resolve, reject) => {
    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        reject(error)
      }
      resolve(stdout ? stdout : stderr)
    })
  })
}

// error handler
export const handleError = (topic: string) => {
  return (error: string) => console.log(`Error: ${topic} >> `, error)
}
