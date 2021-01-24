import PATH from 'path'
import { setCwd, getCwd } from '../../utils/cwd'

import clone from './clone'

export default async (args: string[], helpers: any) => {
  const { log, fs } = helpers
  let [recipeCode, path = '.', ...recipeArgs] = args

  try {
    await fs.create({
      path,
      type: 'folder'
    })

    const recipeDest = PATH.join(path, '/.recipe')
    await clone([recipeCode, recipeDest], helpers)

    setTimeout(async () => {
      const recipeConfigPath = PATH.join(getCwd(), recipeDest, 'reci.config.js')

      const recipeConfig = require(recipeConfigPath).default

      setCwd(path)

      await recipeConfig.run(recipeArgs || [], helpers)
    }, 500)

  } catch (error) {
    log(`>> ${error}`, 'error')
  }
}
