// Operations List API
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')


// Fetch all the operations
router.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: 1,
    data:
      [
        { type:'income', amount: 2000, description: '' }
      ]
  })
})

// Get single operation by ID
router.get('/:id', (req, res) => {
  if(false) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    })
  }

  res.status(200).json({
    status: 'success',
    data: { name: 'single operation' }
  })

})


// Post single operation
router.post('/', (req, res) => {
  console.log(req.body)
  res.status(200).json(req.body)
})


// Patch request example 

router.patch('/:id', (req, res) => {
  // Particulary updating operation object
  res.status(200).json({
    status: 'success',
    data: {
      operation: 'Partulary Updated operation',
      id: req.params.id
    }
  })
})

// DELETE request example

router.delete('/:id', (req, res) => {
  // Particulary updating operation object
  res.status(200).json({
    status: 'success',
    data: {
      operation: `operation with id: ${req.params.id} is deleted`
    }
  })
})

module.exports = router