export type applyTemplateType = (template: string, variables?: object) => string


const escapeRegExp = (input: string): string => {
  return (input || '').replace(/([.*+?^${}()|\[\]\/\\])/g, '\\$1')
}

const applyTemplate: applyTemplateType = (template, variables:any) => {
  return Object.keys(variables).reduce(
    (template: string, key: string): string => {
      return template.replace(
        new RegExp('\{\{\\s*' + escapeRegExp(key) + '\\s*\}\}', 'g'),
        variables[key]
      )
    },
    template
  )
}

export default applyTemplate