import { getConfig } from '../../utils/config'

export default async (args: string[], helpers: any) => {
  const { fs, log } = helpers

  await fs.delete('.build').catch((err: Error) => log(err, 'error'))

  await fs.create({
    path: '.build',
    type: 'folder',
  }).catch((err: Error) => log(err, 'error'))


  await getConfig().run(args, helpers)
}