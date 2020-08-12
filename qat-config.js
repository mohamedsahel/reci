const doMethodParams = {
  createFile: (path, content) => {},
  createFolder: (path) => {},
  getFileContent: (path) => {},
  setFileContent: (path, content) => {},
  toCamelCase: (value) => {},
  command_variable: '',
}


module.exports = {
  tasks: [
    {
      command: 'calcul <num_1> <operator> <num_2> <num_3>',
      run: ({ num_1, num_2, num_3, operator }) => {
        const logic = {
          '+': +num_1 + +num_2,
          'x': +num_1 * +num_2,
          '-': +num_1 - +num_2,
          'div': +num_1 / +num_2,
        }

        if (!Number(num_1)) return console.error(num_1 + ' is not a number')

        if (!Number(num_2)) return console.error(num_2 + ' is not a number')

        if (logic[operator] === undefined)
          return console.error(operator + ' is not an operator')

        console.log(num_3)
        console.log(logic[operator])
      },
    },
  ],
  plugins: [
    {
      name: 'plugin_name',
      options: {
        withIndex: true,
        camelCase: true,
        rootComponentsDir: ['src', 'components'],
      },
    },
  ],
}
