import PATH from 'path'

import { publishRecipe } from '../../api'
import store from '../store'

export default async (args: string[], helpers: any) => {
  const { log, fs } = helpers
  let [path] = args

  if (!path) {
    path = './'
  }

  const token = store.get('token')

  if(!token) {
    log('>> Error: You are not authenticated, Login to publish Recipe', 'error')
    return
  }

  try {
    const paths = await fs.readDir(path)
    const config = require(PATH.resolve(path + '/reci.config.js')).default

    log('>> preparing files ...', 'info')

    const files = await Promise.all(paths.map(async filePath => {
      const content = await fs.readFile(`${path}/${filePath}`)
      return {
        name: filePath,
        extension: PATH.extname(filePath),
        content
      }
    }))

    const filesJson = JSON.stringify(files)

    const recipe = {
      name: config.name,
      description: config.description,
      isPrivate: !!config.isPrivate,
      files: filesJson
    }

    log('>> Publishing Recipe ...', 'info')

    const response = await publishRecipe(recipe, token)

    const addedRecipe = response.data.recipe

    log(`>> ${addedRecipe.name} published successfully!`, 'info')
  } catch (error) {
    log(`>> ${error}`, 'error')
  }
}
