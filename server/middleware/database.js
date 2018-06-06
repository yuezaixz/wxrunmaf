import mongoose from 'mongoose'
import config from '../config'
import fs from 'fs'
import {
  resolve
} from 'path'

const models = resolve(__dirname, '../database/schema')
fs.readdirSync(models)
  .filter(file => ~file.search(/^[^.].*.js$/))
  .forEach(file => require(resolve(models, file)))

export const database = app => {
  mongoose.set('debug', true)

  mongoose.connect(config.db)
  mongoose.connection.on('disconnect', () => {
    mongoose.connect(config.db)
  })

  mongoose.connection.on('error', err => {
    console.log(err)
  })

  mongoose.connection.on('open', async => {
    console.log('Connect to MongoDB', config.db)
  })
}
