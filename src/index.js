#!/usr/bin/env node
const tool = require('./tool')
const { tasks } = require('./config')

tasks.forEach(task => tool.task(task))

tool.args(process.argv.splice(2))
