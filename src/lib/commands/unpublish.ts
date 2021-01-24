import { unpublishReipe } from '../../api'

import { getRecipeCoord } from '../../utils/helpers'
import store from '../store'

export default async (args: string[], helpers: any) => {
  const { log } = helpers
  let [recipeName] = args

  if (!recipeName) {
    return
  }

  const token = store.get('token')

  if(!token) {
    log('>> Error: You are not authenticated, Login to unpublish Recipe', 'error')
    return
  }

  try {
    const { recipeName: name } = getRecipeCoord(recipeName)

    log('>> Unpublishing recipe ...', 'info')
    log(name)

    await unpublishReipe(name, token)

    log(`>> ${name} removed successfully!`, 'info')
  } catch (error) {
    log(`>> ${error.message}`, 'error')
  }
}
