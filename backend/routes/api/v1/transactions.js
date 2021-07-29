// Transactions API
const express = require('express')
const router = express.Router()
const { createTransaction, updateTransaction, deleteTransaction, getTransactions, getTransactionById } = require('../../../controllers/transaction')
const auth = require('../../../controllers/auth')

// Fetch all the transactions
router.get('/', auth.protect, getTransactions)

// GET single transaction by ID
router.get('/:id', getTransactionById)


// POST single transaction
router.post('/', createTransaction)


// PATCH request example 

router.patch('/:id', updateTransaction)

// DELETE request example

router.delete('/:id', auth.protect, auth.restrictTo('admin'), deleteTransaction)

module.exports = router

//