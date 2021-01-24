export const baseURL = 'http://localhost:3000/api'

// Authentication
export const register = {
  url: '/auth/register',
  method: 'post'
}

export const login = {
  url: '/auth/login',
  method: 'post'
}


// Data
export const publishRecipe = {
  url: '/recipes',
  method: 'post'
}

export const getRecipe = {
  url: '/recipes',
  method: 'get'
}

export const unpublishRecipe = {
  url: '/recipes',
  method: 'delete'
}