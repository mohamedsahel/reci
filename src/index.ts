#!/usr/bin/env node
import tasks from './utils/config'
import cli from './cli'
import { TaskType } from 'types'

tasks.forEach((task: TaskType) => cli.addTask(task))

const args = process.argv.splice(2)

cli.execute(args)
