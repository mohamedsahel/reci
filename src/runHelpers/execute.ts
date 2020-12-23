import { execCommand } from '../utils/helpers'


export type ExecuteType = (commands: string | string[]) => void

// excute command line commands
const execute: ExecuteType = async (commands) => {
  const isArray = Array.isArray(commands)
  const isString = typeof commands === 'string'

  if (!isArray && !isString) return

  let output: any

  if (Array.isArray(commands)) {
    output = await execCommand(commands.join(' && '))
  } else if (isString) {
    output = await execCommand(commands)
  }

  if (output.trim()) {
    console.log(output)
  }
}

export default execute