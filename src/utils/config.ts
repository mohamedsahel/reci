import PATH from 'path'

import { getCwd } from './cwd'


export const getCommands = () => require(PATH.join(getCwd(), 'reci.commands.js')).default
export const getConfig = () => require(PATH.join(getCwd(), 'reci.config.js')).default
