const run = async (args, helpers) => {
  const { fs } = helpers

  const content = await fs.read('reci.commands.js')

  console.log(content)

  fs.create({
    path: 'script.js',
    type: 'file',
    content,
  })
}

export default {
  name: 'my-recipe-4',
  description: 'the second recipe - 4',
  isPrivate: false,
  run,
}
