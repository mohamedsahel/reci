const { getCommandObj, getTaskCommandArray } = require('./utils')

module.exports = class Tool {
  constructor(props) {
    this.name = props.name
    this.description = props.description
    this.version = props.version
    this.tasks = [
      {
        command: ['-v'],
        run: () => {
          console.log(this.version)
        }
      }
    ]
  }

  task = (task) => {
    if(!getTaskCommandArray(task.command)) return
    task.command = getTaskCommandArray(task.command)
    this.tasks.push(task)
    return this
  }

  args = (args) => {
    this.tasks.forEach((task) => {
      if (task.command[0] === args[0]) {
        task.run({
          // some functions
          ...getCommandObj(task.command, args)
        })
      }
    })
  }
}
