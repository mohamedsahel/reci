export const getCwd = () => process.cwd()


export const setCwd = (path: string) => {
  process.chdir(path)
}
