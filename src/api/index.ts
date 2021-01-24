import instance from './init'
import * as EP from './endpoints'

export const login = (credentials) => instance[EP.login.method](EP.login.url, credentials)

export const register = (credentials) => instance[EP.register.method](EP.register.url, credentials)

export const publishRecipe = (recipe, token) => instance[EP.publishRecipe.method](EP.publishRecipe.url, recipe, {
  headers: {
    Authorization: token
  }
})

export const unpublishReipe = (name, token) => instance[EP.unpublishRecipe.method](`${EP.unpublishRecipe.method}?name=${name}`, {
  headers: {
    Authorization: token
  },
})

export const getRecipe = ({
  recipeName,
  username,
  token
}: any) => {
  const reqQuery = username ? `recipeName=${recipeName}&username=${username}` : `recipeName=${recipeName}`
  return instance[EP.getRecipe.method](`${EP.getRecipe.url}?${reqQuery}`, {
  headers: {
    Authorization: token
  },
  })
}
