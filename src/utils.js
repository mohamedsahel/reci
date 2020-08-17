const { log } = require('./run-args')

const isVarName = (str) => {
  if (
    typeof str !== 'string' ||
    str.trim() !== str ||
    str.match(' ') !== null ||
    str.match('-') !== null
  ) {
    return false
  }

  try {
    new Function(str)
  } catch {
    return false
  }

  return true
}

const getTaskCommandArray = (string) => {
  const argsArray = string.split(' ')
  const outputArray = []
  let errors = []

  argsArray.forEach((arg, index) => {
    if(!isVarName('_' + arg)) {
      return errors.push(`${arg} is not in a valide argument format`)
    }
    if(arg.trim().length === 0) return
    if(index === 0) return outputArray.push(arg)
    else return outputArray.push('_' + arg)
  })

  if (errors.length) {
    for(error of errors) { log(error, 'red') }
    return null
  }

  return outputArray
}

const getArgumentsObj = (commandArray, argsArray) => {
  const outputObj = {}
  if(commandArray.length) {
    commandArray.forEach((item, index) => {
      if(index === 0) return
      outputObj[item] = argsArray[index]
    })
  }
  return outputObj
}

module.exports = {
  getArgumentsObj,
  getTaskCommandArray,
}
