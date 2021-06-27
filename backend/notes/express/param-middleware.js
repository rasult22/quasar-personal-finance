const express = require('express')
const { route } = require('../../routes/api/v1/operations')

const router = express.Router()


router.param('id', (req, res, next, value) => {
  console.log(value)
})

/*
  Param middleware is middleware that only runs 
  for certain parameters.

*/

