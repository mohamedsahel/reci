#!/usr/bin/env node
import { getCommands } from './utils/config'
import cli from './cli'

import inquirer from 'inquirer'

(async () => {
  const { command } = await inquirer.prompt([{
      type: 'input',
      name: 'command',
      message: 'type a command'
    }])

    console.log(command.split(' '))
    cli.execute(command.trim().split(' '))
  }
)()

// cli.addCommands(getCommands())

// // const command = process.argv.splice(2)
// const command = ['remove', 'my-recipe']


// cli.execute(command)
