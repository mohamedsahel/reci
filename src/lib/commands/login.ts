import  { login } from '../../api'
import store from '../store'

export default async (args: string[], helpers: any) => {
  const { prompt, log } = helpers

  if(!!store.get('token')) {
    const user = store.get('user')
    log(`You are already singin as ${user.username} [${user.email}]`)
    return
  }

  try {
    const credentials = await prompt([
      {
        type: 'input',
        name: 'username',
        message: 'Username: ',
      },
      {
        type: 'password',
        name: 'password',
        message: 'Password: ',
      },
    ])

    log(`Login...`)

    const response = await login(credentials)
    const { user, token } = response.data

    store.set('token', token.value)
    store.set('user', user)

    log(`>> Signed in as ${user.username} [${user.email}]`, 'success')
  } catch (error) {
    log(error, 'error')
  }
}
