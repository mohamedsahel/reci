#!/usr/bin/env node
const Tool = require('./tool')
const { tasks } = require('./config')

const tool = new Tool({
  name: 'Qat',
  name: 'Quickly automate coding tasks',
  version: '0.0.1',
})

tasks.forEach(task => tool.task(task))

tool.args(process.argv.splice(2))
