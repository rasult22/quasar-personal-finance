const express = require('express')

const app = express()

app.use(middleware)


function middleware (req, res, next) {
  req.requestTime = new Date().toISOString()
  console.log('Hello from the middleware', req.requestTime)
}

app.listen(5000, () => console.log('started....'))