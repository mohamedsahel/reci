import { getRecipe } from '../../api'
import { getRecipeCoord } from '../../utils/helpers'
import store from '../store'

export default async (args: string[], helpers: any) => {
  const { log, fs } = helpers
  let [recipeCode, path] = args

  const token = store.get('token')

  try {
    log('>> Fetching files ...', 'info')

    const response = await getRecipe({
      ...getRecipeCoord(recipeCode),
      token
    })

    const recipe = response?.data?.recipe

    if(recipe) {
      recipe.files = JSON.parse(recipe?.files)
    }

    if (!path) {
      path = recipe.name
    }

    await fs.create({
      path,
      type: 'folder',
      children: recipe.files.map(file => ({
        path: file.name,
        type: 'file',
        content: file.content,
      }))
    })


    log(`>> ${recipe.name} cloned successfully!`, 'info')
  } catch (error) {
    log(`>> ${error}`, 'error')
  }
}
