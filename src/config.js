const path = require('path')

const cwd = process.cwd()

const customConfig = require(path.join(cwd, 'qat-config.js'))

module.exports = {
  tasks: customConfig.tasks,
  plugins: customConfig.plugins,
}
