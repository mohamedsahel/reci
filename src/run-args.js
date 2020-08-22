const fs = require('fs')
const path = require('path')
const { exec } = require('child_process')

const cwd = process.cwd()
const resolvePath = (pathArg) => path.resolve(cwd, pathArg)

// replacement of console.log, but with colors arguments
const log = (string, color, bgColor) => {
  if (!color) return console.log(string)

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

  if (bgColor) console.log(colors.bg[bgColor])
  console.log(colors[color] + '%s\x1b[0m', string)
}

//create a folder/direction with the given path
const createFolder = (folderPath) =>
  new Promise((resolve, reject) => {
    fs.mkdir(resolvePath(folderPath), { recursive: true }, (err) => {
      if (err) return reject(err)
      resolve(folderPath + '/')
    })
  })

// create a file with the given path, and set content to it
const createFile = (filePath, content = '') =>
  new Promise((resolve, reject) => {
    fs.writeFile(resolvePath(filePath), content, (err) => {
      if (err) return reject(err)
      resolve(filePath + '/')
    })
  })

// get file content by its path
const getFileContent = (path) =>
  new Promise((resolve, reject) => {
    fs.readFile(resolvePath(path), 'utf8', (err, content) => {
      if (err) reject(err)
      resolve(content)
    })
  })

// helper fonction for excuting command line commands
const execCommand = (cmd) =>
  new Promise((resolve) => {
    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        log(error, 'red')
      }
      resolve(stdout ? stdout : stderr)
    })
  })

// open the given path file
const openFiles = async (paths) => {
  try {
    if (typeof paths === 'string') await execCommand(`code -r ${paths}`)
    else if (Array.isArray(paths))
      await execCommand(`code -r ${paths.join(' ')}`)
    else throw paths + ' is not a correct path'
  } catch (err) {
    throw err
  }
}

// open the given url in th edefault browser
const openURL = async (url) => {
  const start =
    process.platform == 'darwin'
      ? 'open'
      : process.platform == 'win32'
      ? 'start'
      : 'xdg-open'
  await execCommand(start + ' ' + url)
}

// excute command line commands
const execute = async (commands) => {
  const isArray = Array.isArray(commands)
  const isString = typeof commands === 'string'
  if (!isArray && !isString) return

  let output
  if (isArray) {
    output = await execCommand(commands.join(' && '))
  } else if (isString) {
    output = await execCommand(commands)
  }

  if (output.trim()) {
    console.log(output)
  }
}

// esecute shell scripts files
const executeFile = async (filePath) => {
  await execute('sh ' + resolvePath(filePath))
}

module.exports = {
  log,
  cwd,
  createFolder,
  createFile,
  getFileContent,
  openFiles,
  openURL,
  execute,
  executeFile,
}
