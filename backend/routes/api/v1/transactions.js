// Transactions API
const express = require('express')
const router = express.Router()
const { createTransaction, updateTransaction, deleteTransaction, getTransactions, getTransactionById } = require('../../../controllers/transaction')
const auth = require('../../../controllers/auth')

// Fetch all the operations
router.get('/', auth.protect, getTransactions)

// GET single operation by ID
router.get('/:id', getTransactionById)


// POST single operation
router.post('/', createTransaction)


// PATCH request example 

router.patch('/:id', updateTransaction)

// DELETE request example

router.delete('/:id', auth.protect, auth.restrictTo('admin'), deleteTransaction)

module.exports = router

//