const Operation = require('../models/operationModel')
const APIFeatures = require('../utils/apiFeatures')
const AppError = require('../utils/appError')
const catchAsync = require('../utils/catchAsync')
 
exports.createOperation = catchAsync(async (req, res) => {
    const newOperation = await Operation.create(req.body)
    res.status(201).json({
      status: 'success',
      data: { 
        operation: newOperation
      }
    })    
})
exports.updateOperation =  catchAsync(async (req, res) => {
    const operation = await Operation.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    })

    res.status(200).json({
      status: 'success',
      data: { operation }
    })
})
exports.deleteOperation =  catchAsync(async (req, res) => {
    const operation = await Operation.findByIdAndDelete(req.params.id)

    res.status(204).json({
      status: 'success',
      data: null
    })
})

exports.getOperations =  catchAsync(async (req, res) => {
    
    const features = new APIFeatures(Operation.find(), req.query)
    .limitFields()
    const operations = await features.mongoQuery
    res.status(200).json({
      status: 'success',
      results: operations.length,
      data: { operations }
    })  
})

exports.getOperationById =  catchAsync(async (req, res) => {
    const operation = await Operation.findById(req.params.id)

    res.status(200).json({
      status: 'success',
      data: { operation }
    }) 
})