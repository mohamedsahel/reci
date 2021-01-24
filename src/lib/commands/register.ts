import { register } from '../../api'
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
        type: 'input',
        name: 'email',
        message: 'Email: ',
      },
      {
        type: 'password',
        name: 'password',
        message: 'Password: ',
      },
      {
        type: 'password',
        name: 'passwordConfirm',
        message: 'Confirm Password: ',
      },
    ])

    while (credentials.password !== credentials.passwordConfirm) {
      log('Wrong password!')

      const input = await prompt([
        {
          type: 'password',
          name: 'passwordConfirm',
          message: 'Confirm Password: ',
        },
      ])

      credentials.passwordConfirm = input.passwordConfirm
    }

    log(`Registering...`)

    const response = await register({
      username: credentials.username,
      email: credentials.email,
      password: credentials.password
    })

    const { user, token } = response.data

    store.set('token', token.value)
    store.set('user', user)

    log(`You have successfully registered! \n >> Logged in as ${user.username} [${user.email}]`, 'success')
  } catch (error) {
    log('Un error has occured: ' + error.response, 'error')
  }
}
