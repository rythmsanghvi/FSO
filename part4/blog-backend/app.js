const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const blogsRouter = require('./controllers/blogs')

const app = express()

logger.info('connecting to DB')

mongoose
  .connect(config.MONGODB_URI, { family: 4 })
  .then(() => {
    logger.info('connected to DB')
  })
  .catch((error) => {
    logger.error('error connecting to DB: ', error.message)
  })

app.use(express.json())

app.use('/api/blogs', blogsRouter)

module.exports = app
