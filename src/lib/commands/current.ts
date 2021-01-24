import store from '../store'

export default async (args: string[], helpers: any) => {
  const { log } = helpers
  const [query] = args

  switch(query) {
    case 'user':
      log(JSON.stringify(store.get('user')))
      break;
    case 'token':
      log(JSON.stringify(store.get('token')))
  }
}
