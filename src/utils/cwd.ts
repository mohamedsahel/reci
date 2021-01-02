import PATH from 'path'

let cwd = process.cwd()

export const getCwd = () => {
  return cwd
}

export const setCwd = (path: string) => {
  cwd = PATH.resolve(cwd, path)
}
