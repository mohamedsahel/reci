/*========================
TO FIX:
- check main command argument format
- excue run function as an async funtion
========================*/

const doMethodParams = {
  createFile: (path, content) => {},
  createFolder: (path) => {},
  getFileContent: (path) => {},
  setFileContent: (path, content) => {},
  openFile: (path) => {},
  toCamelCase: (value) => {},
  excute: (shell_command) => {},
  log: (value, color, background) => {},
  cwd: '',
  command_variable: '',
}


module.exports = {
  tasks: [
    {
      command: 'add <dir> <file>',
      run: async ({ dir, file, createFolder, createFile, log, cwd }) => {
        try {
          await createFolder(dir)
          await createFile(dir + '/' + file + '.jsx')
          log('file and folder created successfully', 'green')
        } catch (error) {
          log(error, 'red')
        }
      }
    }
    // {
    //   command: 'add <component_name> <flag>',
    //   run: async ({ component_name, flag, createFile, createFolder, cwd, logColor }) => {

    //     try {
    //       await createFolder(`${cwd}/src/`)
    //       await createFolder(`${cwd}/src/components`)
    //       await createFolder(`${cwd}/src/components/${component_name}`)
    //       await createFile(`${cwd}/src/components/${component_name}/${component_name}.component.jsx`, compTemplate(component_name))
    //       await createFile(`${cwd}/src/components/${component_name}/${component_name}.styles.jsx`, styleTemplate(component_name))

    //       log(`${component_name} successfuly created!`, 'green')

    //     } catch (error) {
    //       log(error, 'red')
    //     }
    //   },
    // },
  ],
  plugins: [
    {
      resolve: 'plugin_name',
      options: {
        withIndex: true,
        camelCase: true,
        rootComponentsDir: ['src', 'components'],
      },
    },
  ],
  pluginsExample: {
    name: 'create_component_template',
    command: 'create <component_name> <with_style>',
    run: async ({ options, component_name, with_style }) => {

    }
  }
}
