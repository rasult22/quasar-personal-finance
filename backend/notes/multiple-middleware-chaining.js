/* 
  Create a checkBody middleware
  Check if the body contains the name and price property
  If not, send back 400 (bad request)

  Add it to the post body handler stack
*/


const express = require('express')
const { route } = require('../routes/api/v1/operations')

const router = express.Router()

// Middleware chaining
router
  .route('/')
  .get(() => {})
  .post(middleware, () => {})



function middleware (res, req, next) {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'fail',
      message: 'missing name'
    })
  }
  next() 
}