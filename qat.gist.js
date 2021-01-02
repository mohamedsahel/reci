export default {
  name: 'cli',
  description: '',
  run: async (args, helpers) => {
    const { fs } = helpers

    const content = await fs.read('qat.commands.js')

    console.log(content)

    fs.create({
      path: 'script.js',
      type: 'file',
      content
    })
  }
}
