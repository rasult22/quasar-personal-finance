const express = require('express')
const mongoose = require('mongoose')

const morgan = require('morgan')
const path = require('path')
const AppError = require('./utils/appError')
const app = express()
const dotenv = require('dotenv')
const globalErrorHandler = require('./controllers/error')

// Environment variables
dotenv.config({path: './config.env'})

// Middleware for letting client poss data
if(process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}
app.use(express.json())
app.use(express.static(`${__dirname}/public`))




app.use(express.urlencoded({ extended: false }))

// local DB
// const localDB = process.env.DATABASE_LOCAL

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

app.all('*', (req, res, next) => {
  next(new AppError(`Cannot find ${req.originalUrl} on this server`, 404))
})

app.use(globalErrorHandler)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log('Server started on:', PORT)
})
