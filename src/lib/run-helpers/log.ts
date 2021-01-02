

const colors: any = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
}

type LogType = (text: any, status?: 'default' | 'success' | 'info' | 'warn' | 'error' | undefined) => void

const log: LogType = (text, status) => {
  switch(status) {
    case undefined || 'default' :
      console.log(text)
      break;

    case 'success' :
      console.log(colors.green + '%s\x1b[0m', text)
      break;

    case 'warn' :
      console.log(colors.yellow + '%s\x1b[0m', text)
      break;

    case 'error' :
      console.log(colors.red + '%s\x1b[0m', text)
      break;

  }
}

export default log