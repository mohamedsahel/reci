
const template = `
import fs from "fs"

const {{ functionName }} = () => {
  console.log('{{ varaibleName }}')
}

export default {{ functionName }}
`

module.exports = {
  add: async (args, lib) => {
    const [componentName, ...rest] = args
    const { log, fs } = lib
    const withCss = rest.include('--withCss')

    // create component and its styles files
    await fs
      .create({
        path: 'src/component',
        children: [
          {
            path: componentName + '.jsx',
            content: generateContent({
              template: 'component',
              variables: {
                componentName,
                stylesPath: './' + componentName + '.css',
              },
            }),
          },
          withCss && {
            path: componentName + '.css',
            content: generateContent({
              template: 'styles',
            }),
          },
        ],
      })
      .catch(log.error)

    // add new compoenent to index file
    await fs.edit('components/index.ts', (err, content) => {
      if(err) {
        return log.error(err)
      }

      const newLine = `\n export { default as ${componentName} } from './${componentName}.tsx'`

      return content + newLine
    }).catch(log.error)

    log.success(componentName + 'added succefully')
  },
}