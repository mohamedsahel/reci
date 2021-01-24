import store from '../store'

export default async (args: string[], helpers: any) => {
  const { log } = helpers

  if(!store.get('token')) {
    log(`You are not singed in!`)
    return
  }

  store.delete('token')
  store.delete('user')

  log(`>> Logout successfully`, 'success')
}
