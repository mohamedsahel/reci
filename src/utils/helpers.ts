import fs from 'fs'
import path from 'path'
import { exec } from 'child_process'

const cwd = process.cwd()
export const resolvePath = (pathArg: string) => path.resolve(cwd, pathArg)

// helper fonction for excuting command line commands
export const execCommand = (cmd: string) =>
  new Promise((resolve, reject) => {
    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        reject(error)
      }
      resolve(stdout ? stdout : stderr)
    })
  })
