const TransactionCategory = require('../models/transactionCategoriesModel')
const APIFeatures = require('../utils/apiFeatures')
const AppError = require('../utils/appError')
const catchAsync = require('../utils/catchAsync')



exports.create = catchAsync( async (req, res, next) => {
  const newCategory = await TransactionCategory.create(req.body)

  res.status(201).json({
    status: 'success',
    data: {
      category: newCategory
    }
  })
})