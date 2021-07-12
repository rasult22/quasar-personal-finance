const express = require('express')
const mongoose = require('mongoose')
const rateLimit = require('express-rate-limit')
const helmet = require('helmet')
const morgan = require('morgan')
const path = require('path')
const AppError = require('./utils/appError')
const app = express()
const dotenv = require('dotenv')
const globalErrorHandler = require('./controllers/error')

// handling edge cases
errorHandlersFallback()

// Environment variables
dotenv.config({path: './config.env'})

// Development logging
if(process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}
// Body parser, reading data from body into req.body
app.use(express.json(), {
  limit: '10kb'
})

// serving static files
app.use(express.static(`${__dirname}/public`))

// parsing incoming requests with urlencoded payloads 
app.use(express.urlencoded({ extended: false }))

// Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour' 
})
app.use('/api', limiter)

// set security HTTP headers
app.use(helmet())

// local DB
// const DB = process.env.DATABASE_LOCAL

// cloud DB
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD)

// mongoose.connect(localDB, {
mongoose.connect(DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
}).then(connection => console.log('DB connection successful'))




// Operations, Users API route
app.use('/api/v1/operations', require('./routes/api/v1/operations'))
app.use('/api/v1/users', require('./routes/api/v1/users'))

// handle 404 
app.all('*', (req, res, next) => {
  next(new AppError(`Cannot find ${req.originalUrl} on this server`, 404))
})

// Centralized global express error handler
app.use(globalErrorHandler)

const PORT = process.env.PORT || 5000
const server = app.listen(PORT, () => {
  console.log('Server started on:', PORT)
})


function errorHandlersFallback() {
  process.on('unhandledRejection', error => {
    console.error(error.name, error.message);
    console.error('Unhandled rejection! Shutting down an application...')
    server.close(()=> {
      process.exit(1)
    })
  })
  
  process.on('uncaughtException', error => {
    console.error(error.name, error.message);
    console.error('UNCAUGHT EXCEPTION! Shutting down an application...')
    process.exit(1)
  })
}
