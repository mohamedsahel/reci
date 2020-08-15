const fs = require('fs')
const path = require('path')
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

const createFolder = async folderPath => {
  try {
    await fs.mkdir(path.join(cwd, folderPath), () => {}, { recursive: true })
  } catch (err) {
    throw new Error(err)
  }
}

const createFile = async (filePath, content = '') => {
  try {
    await fs.writeFile(path.join(cwd, filePath), content, () => {})
  } catch (err) {
    throw new Error(err)
  }
}


module.exports = {
  log,
  cwd,
  createFolder,
  createFile,
}
