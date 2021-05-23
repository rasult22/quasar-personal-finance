const express = require('express')
const morgan = require('morgan')
const app = express()

app.use(morgan('dev'))

app.use(express.json())

app.use(middleware)


function middleware (req, res, next) {
  req.requestTime = new Date().toISOString()
  next()
}

app.listen(5000, () => console.log('started....'))