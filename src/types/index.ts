import { PrintType } from '../runHelpers/print'
import { CreateFolderType } from '../runHelpers/createFolder'
import { CreateFileType } from '../runHelpers/createFile'
import { ReadFileType } from '../runHelpers/readFile'
import { OpenFilesType } from '../runHelpers/openFiles'
import { OpenUrlType } from '../runHelpers/openUrl'
import { ExecuteType } from '../runHelpers/execute'
import { ExecuteFileType } from '../runHelpers/executeFile'
import { applyTemplateType } from 'runHelpers/applyTemplate'


export type RunHelpersType = {
  print: PrintType
  createFolder: CreateFolderType
  createFile: CreateFileType
  readFile: ReadFileType
  openFiles: OpenFilesType
  openUrl: OpenUrlType
  execute: ExecuteType
  executeFile: ExecuteFileType
  applyTemplate: applyTemplateType
}


export interface TaskType {
  command: string
  run: () => void
}
