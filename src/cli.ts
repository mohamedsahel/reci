import { TaskType } from 'types'
import runHelpers from './runHelpers'

type AddTaskType = (task: TaskType) => void
type ExecuteType = (args: string[]) => void

type formatedArgsType = {
  main: string
  args: string[]
}

type FormatCommandType = (args: string[]) => formatedArgsType

// split command args to main arguments and the rest
const formatCommand: FormatCommandType = (commandArray) => {
  const [main, ...args] = commandArray

  return {
    main,
    args,
  }
}

class Cli {
  tasks: any = {
    '-v': {
      commandTemplate: ['-v'],
      run: () => {
        console.log('1.0.0')
      },
    },
  }

  addTask: AddTaskType = (task) => {
    // format commandTemplate from string to array of agrs
    const commandTemplate: string[] = task.command.replace(/\s+/g, ' ').trim().split(' ')

    this.tasks[commandTemplate[0]] = {
      run: task.run,
      commandTemplate,
    }

    return this
  }

  execute: ExecuteType = (commandArray) => {
    // extract main and rest aruments from command array
    const { main, args } = formatCommand(commandArray)
    // get the right task command template and run function
    const { commandTemplate, run } = this.tasks[main]
    // execlue main arg from command template
    const templateArgs = commandTemplate.splice(1)
    const argsParam: any = {}

    // match template args with command input args
    let i: number = 0
    while (i < templateArgs.length) {
      const tempArg = templateArgs[i]

      if (tempArg.startsWith('...')) {
        argsParam[tempArg.replace('...', '')] = args.splice(i)
        i = templateArgs.length
      } else {
        argsParam[tempArg] = args[i]
        i++
      }
    }

    run(argsParam, runHelpers)
  }
}

export default new Cli()
