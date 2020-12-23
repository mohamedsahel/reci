import path from 'path'

const cwd = process.cwd()

export default require(path.join(cwd, 'qat.config.js'))
