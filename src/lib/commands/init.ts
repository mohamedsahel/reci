import path from 'path'

const qatTemplate = `export default {
  name: '{{ name }}',
  description: '{{ description }}',
  run: (args, helpers) => {
    // ... happy coding :)
  }
}
`


export default async (args: string[], helpers: any) => {
  const { fs, applyTemplate, prompt, log } = helpers

  const qatPath = 'qat.gist.js'
  let name = path.basename(process.cwd())
  let description = ''

  if(args[0] === '--y') {

  } else {
    const answers = await prompt([
      {
        type: 'input',
        name: 'name',
        message: 'What is the Qat\'s name?',
        default: name
      },
      {
        type: 'input',
        name: 'description',
        message: 'What is the Qat\'s description?',
        default: description
      },
    ]).catch((err: Error) => log(err, 'error'))

    name = answers.name
    description = answers.description
  }

  fs.create({
    path: qatPath,
    type: 'file',
    content: applyTemplate(qatTemplate, {
      name,
      description
    })
  })

  log(qatPath + ' Added seccessfully', 'sucess')

  return
}