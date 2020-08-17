const fs = require('fs')
const path = require('path')
const { exec } = require('child_process')

const cwd = process.cwd()


const log = (string, color, bgColor) => {
  if(!color) return console.log(string)

  const colors = {
    black: '\x1b[30m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    white: '\x1b[37m',
    crimson: '\x1b[38m',

    bg: {
      black: '\x1b[40m',
      red: '\x1b[41m',
      green: '\x1b[42m',
      yellow: '\x1b[43m',
      blue: '\x1b[44m',
      magenta: '\x1b[45m',
      cyan: '\x1b[46m',
      white: '\x1b[47m',
      crimson: '\x1b[48m',
    },
  }

  if(bgColor) console.log(colors.bg[bgColor])
  console.log(colors[color] + '%s\x1b[0m', string)
}


const createFolder = folderPath => new Promise((resolve, reject) => {
  fs.mkdir(path.join(cwd, folderPath), { recursive: true }, err => {
    if(err) return reject(err)
    resolve(folderPath + '/')
  })
})


const createFile = (filePath, content = '') => new Promise((resolve, reject) => {
  fs.writeFile(path.join(cwd, filePath), content, (err) => {
    if(err) return reject(err)
    resolve(filePath + '/')
  })
})


const execCommand = cmd => new Promise((resolve, rejecet) => {
  exec(cmd, (error, stdout, stderr) => {
    if (error) {
     log(error, 'red')
    }
    resolve(stdout ? stdout : stderr)
   })
})


const execute = async (commands) => {
  let currentOutput
  if (Array.isArray(commands)) {
    for(command of commands) {
      currentOutput = await execCommand(command)
      if(currentOutput.trim()) {
        console.log(currentOutput)
      }
    }
  } else if (typeof commands === 'string') {
    currentOutput = await execCommand(commands)
    if(currentOutput.trim()) {
      console.log(currentOutput)
    }
  } else {
    return
  }
}



module.exports = {
  log,
  cwd,
  createFolder,
  createFile,
  execute
}
