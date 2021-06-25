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

// Example of middleware for aliasing
exports.aliasTopUsers = (req, res, next) => {
  req.query.limit = '3'
  req.query.sort = '-rating'
  req.query.fields = 'name,rating,balance'
  next()
}