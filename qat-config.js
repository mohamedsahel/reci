/*========================
TO FIX:
//// check main command argument format
========================*/

const doMethodParams = {
  // // createFile: (path, content) => {},
  // // createFolder: (path) => {},
  getFileContent: (path) => {},
  setFileContent: (path, content) => {},
  openFile: (path) => {},
  toCamelCase: (value) => {},
  excute: (shell_command) => {},
  // // log: (value, color, background) => {},
  // // cwd: '',
  // // command_variable: '',
}


module.exports = {
  tasks: [
    {
      command: 'push message',
      run: async ({ _message, log, execute }) => {
        try {
          await execute(
            [
              'git add .',
              `git commit -m "${_message}"`,
              `git push origin develop`
            ]
          )
          log('changes successfully committed', 'green')
        } catch (err) {
          throw new Error(err)
        }
      }
    }
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