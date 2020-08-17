const { getArgumentsObj, getTaskCommandArray } = require('./utils')
const runArgs = require('./run-args')

class Tool {
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
          ...runArgs,
          ...getArgumentsObj(task.command, args)
        })
      }
    })
  }
}



module.exports = new Tool({
  name: 'Qat',
  name: 'Quickly automate coding tasks',
  version: '0.0.1',
})
