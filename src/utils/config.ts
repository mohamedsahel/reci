import PATH from 'path'

export const cwd = process.cwd()


export const getCommands = () => require(PATH.join(cwd, 'qat.commands.js')).default
export const getGist = () => require(PATH.join(cwd, 'qat.gist.js')).default
