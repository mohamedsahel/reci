

const colors: any = {
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


export type PrintType = (text: any, color?: string, background?: string) => void

// replacement of console.log, but with colors arguments
const print: PrintType = (text, color, background) => {
  if (!color) return console.log(text)

  if (background) console.log(colors.bg[background])
  if (color) console.log(colors[color] + '%s\x1b[0m', text)

  return text
}

export default print
