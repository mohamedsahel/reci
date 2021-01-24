import PATH from 'path'
import { exec } from 'child_process'

import { getCwd } from './cwd'


export const resolvePath = (...paths: string[]) => PATH.resolve(getCwd(), ...paths)

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
  return (error?: string) => console.log(`Error: ${topic} \n`, error)
}

// get recipe and recipeName
export const getRecipeCoord = (input: string) => {
  if(input.includes('/')) {
    const array = input.trim().split('/')
    return {
      username: array[0],
      recipeName: array[1]
    }
  }

  return {
    recipeName: input.trim()
  }
}
