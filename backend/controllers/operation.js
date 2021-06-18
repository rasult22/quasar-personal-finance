const Operation = require('../models/operationModel')

 
exports.createOperation = async (req, res) => {

  try {
    const newOperation = await Operation.create(req.body)
  
    res.status(201).json({
      status: 'success',
      data: { 
        operation: newOperation
      }
    })    
  } catch (err) {
    res.status(400).json({
      status: 'error',
      message: err
    })
  }
}
exports.updateOperation = async (req, res) => {
  try {
    const operation = await Operation.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    })

    res.status(200).json({
      status: 'success',
      data: { operation }
    })
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err
    })
  }
}
exports.deleteOperation = async (req, res) => {
  try {
    const operation = await Operation.findByIdAndDelete(req.params.id)

    res.status(204).json({
      status: 'success',
      data: null
    })

  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err
    })
  }
}

exports.getOperations = async (req, res) => {
  try {
    const operations = await Operation.find()

    res.status(200).json({
      status: 'success',
      results: operations.length,
      data: { operations }
    })

  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err
    })
  }
}

exports.getOperationById = async (req, res) => {
  try {
    const operation = await Operation.findById(req.params.id)

    res.status(200).json({
      status: 'success',
      data: { operation }
    })
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err
    })
  }
}