const Transaction = require('../models/transactionModel')
const Wallet = require('../models/walletModel')

const APIFeatures = require('../utils/apiFeatures')
const AppError = require('../utils/appError')
const catchAsync = require('../utils/catchAsync')
 
exports.createTransaction = catchAsync(async (req, res) => {
    const newTransaction = await Transaction.create(req.body)

    // here patch wallet balance

    res.status(201).json({
      status: 'success',
      data: { 
        transaction: newTransaction
      }
    })    
})
exports.updateTransaction =  catchAsync(async (req, res) => {
    const transaction = await Transaction.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    })

    res.status(200).json({
      status: 'success',
      data: { transaction }
    })
})
exports.deleteTransaction =  catchAsync(async (req, res) => {
    const transaction = await Transaction.findByIdAndDelete(req.params.id)

    res.status(204).json({
      status: 'success',
      data: null
    })
})

exports.getTransactions =  catchAsync(async (req, res) => {
    
    const features = new APIFeatures(Transaction.find(), req.query)
    .limitFields()
    const transactions = await features.mongoQuery
    res.status(200).json({
      status: 'success',
      results: transactions.length,
      data: { transactions }
    })  
})

exports.getTransactionById =  catchAsync(async (req, res) => {
    const transaction = await Transaction.findById(req.params.id)

    res.status(200).json({
      status: 'success',
      data: { transaction }
    }) 
})
