import PATH from 'path'
import { exec } from 'child_process'
const FS = require('fs').promises

import { getCwd } from './cwd'


export const resolvePath = (pathArg) => PATH.resolve(getCwd(), pathArg)

// helper fonction for excuting command line commands
export const execCommand = (cmd) => {
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
export const handleError = (topic) => {
  return (error) => console.log(`Error: ${topic} >> `, error)
}
