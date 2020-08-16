
const isVarName = (str) => {
  if (
    typeof str !== 'string' ||
    str.trim() !== str ||
    str.match(' ') !== null ||
    str.match('-') !== null ||
    Number(str[0])
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

const getArgument = (string, isMain) => {
  if (isMain) {
    if (!isVarName(string))
      throw `${string} is not a valide argument format`
    else {
      return string
    }
  }

  const beginRegexp = /^</
  const endRegexp = />$/

  if (beginRegexp.test(string) && endRegexp.test(string)) {
    const variable = string.replace('<', '').replace('>', '')
    if (!isVarName(variable)) {
      throw `${variable} is not valide variable format`
    } else {
      return variable
    }
  } else if (beginRegexp.test(string)) {
    throw `${string} is not valide argument format, do you mean ${string}> ?`
  } else if (endRegexp.test(string)) {
    throw `${string} is not valide argument format, do you mean <${string} ?`
  } else {
    throw `${string} is not valide argument format, do you mean <${string}> ?`
  }
}

const getTaskCommandArray = (string) => {
  const argsArray = string.split(' ').filter((item) => item.length !== 0)

  const outputArray = []

  try {
    argsArray.forEach((argument, index) => {
      if(index === 0) outputArray.push(getArgument(argument, true))
      else outputArray.push(getArgument(argument))
    })
  } catch (error) {
    return console.log(error)
  }

  if (outputArray.length !== argsArray.length) {
    return
  }
  return outputArray
}

const getCommandObj = (commandArray, argsArray) => {
  const outputObj = {}
  commandArray.forEach((item, index) => {
    if (index === 0) return
    outputObj['_' + item] = argsArray[index]
  })
  return outputObj
}

module.exports = {
  getCommandObj,
  getTaskCommandArray,
}

