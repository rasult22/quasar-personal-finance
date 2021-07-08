// Operations List API
const express = require('express')
const router = express.Router()
const { createOperation, updateOperation, deleteOperation, getOperations, getOperationById } = require('../../../controllers/operation')
const auth = require('../../../controllers/auth')

// Fetch all the operations
router.get('/', auth.protect, getOperations)

// GET single operation by ID
router.get('/:id', getOperationById)


// POST single operation
router.post('/', createOperation)


// PATCH request example 

router.patch('/:id', updateOperation)

// DELETE request example

router.delete('/:id', auth.protect, auth.restrictTo('admin'), deleteOperation)

module.exports = router

//