const express = require('express')
// const path = require('')
const morgan = require('morgan')
const mongoose = require('mongoose')
const path = require('path')
const app = express()
const dotenv = require('dotenv')

// Environment variables
dotenv.config({path: './config.env'})

// Middleware for letting client poss data
if(process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}
app.use(express.json())
app.use(express.static(`${__dirname}/public`))




app.use(express.urlencoded({ extended: false }))

mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error'))
db.once('open', function() {
  // we are connected
  console.log('MongoDB: We are connected')
})

// Operations API route
app.use('/api/v1/operations', require('./routes/api/v1/operations'))
app.use('/api/v1/users', require('./routes/api/v1/users'))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log('Server started on:', PORT)
})