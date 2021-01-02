import { PrintType } from '../lib/run-helpers/log'
import { CreateFolderType } from '../lib/run-helpers/createFolder'
import { deleteFolderType } from '../lib/run-helpers/deleteFolder'
import { CreateFileType } from '../lib/run-helpers/createFile'
import { ReadFileType } from '../lib/run-helpers/readFile'
import { EditFileType } from '../lib/run-helpers/editFile'
import { deleteFileType } from '../lib/run-helpers/deleteFile'
import { OpenFilesType } from '../lib/run-helpers/openFiles'
import { OpenUrlType } from '../lib/run-helpers/openUrl'
import { ExecuteType } from '../lib/run-helpers/execute'
import { ExecuteFileType } from '../lib/run-helpers/executeFile'
import { applyTemplateType } from '../lib/run-helpers/applyTemplate'


export type RunHelpersType = {
  print: PrintType
  createFolder: CreateFolderType
  deleteFolder: deleteFolderType
  createFile: CreateFileType
  readFile: ReadFileType
  editFile: EditFileType
  deleteFile: deleteFileType
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
