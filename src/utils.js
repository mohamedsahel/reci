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
  if(!string) return null
  const argsArray = string.trim().split(' ')
  const outputArray = []
  let errors = []


  argsArray.forEach((arg, index) => {

    // filter spaces and '' items, and undefined
    if(arg.trim().length === 0 || arg === undefined) return

    // check for arrays (...agr) variables
    if(arg.startsWith('...')) {
      const argName = arg.split('...').join('')

      //add error if there are some other variables after the array variable
      if(index !== argsArray.length - 1) {
        return errors.push(`can not add arguments after the array variable (${arg})`)
      }

      // check if the array variable is in a valide format
      if(!isVarName('_' + argName)) {
        return errors.push(`${arg} is not in a valide argument format`)
      }

      return outputArray.push(['_' + argName])
    }

    // check if the variable is in a valide format
    if(!isVarName('_' + arg)) {
      return errors.push(`${arg} is not in a valide argument format`)
    }

    // push first argument with no _ at the begining
    if(index === 0) return outputArray.push(arg)

    // push valide variable with _ at the beginning
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
      if(Array.isArray(item)) {
        outputObj[item[0]] = argsArray.splice(index, argsArray.length - 1)
        return
      }
      outputObj[item] = argsArray[index]
    })
  }

  return outputObj
}

module.exports = {
  getArgumentsObj,
  getTaskCommandArray,
}
