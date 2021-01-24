import * as runHelpers from './lib/run-helpers'
import { init, test, login, register, logout, current, publish, unpublish, clone, install } from './lib/commands'

type AddCommandsType = (commands: object) => void
type ExecuteType = (args: string[]) => void


class Cli {
  commands: any = {
    '-v': () => {
      console.log('0.0.1')
    },
    init,
    test,
    login,
    register,
    logout,
    current,
    publish,
    unpublish,
    clone,
    install
  }

  addCommands: AddCommandsType = (commands) => {
    this.commands = { ...this.commands, commands }
  }

  execute: ExecuteType = (commandArray) => {
    const [topic, ...args] = commandArray

    // execute run function
    this.commands[topic](args, runHelpers)
  }
}

export default new Cli()
