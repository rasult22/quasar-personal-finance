const User = require('../models/userModel')

 
exports.createUser = async (req, res) => {

  try {
    const newUser = await User.create(req.body)
  
    res.status(201).json({
      status: 'success',
      data: { 
        user: newUser
      }
    })    
  } catch (err) {
    res.status(400).json({
      status: 'error',
      message: err
    })
  }
}
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    })

    res.status(200).json({
      status: 'success',
      data: { user }
    })
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err
    })
  }
}
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id)

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

exports.getUsers = async (req, res) => {
  try {
    // build query
    // 1. Filtering
    const queryObj = {...req.query }
    const excludeFields = ['page', 'sort', 'limit', 'fields']

    excludeFields.forEach(field => delete queryObj[field])

    // 2. Advanced filtering
    // {rating: 3, balance: { $gte: 5 }}
    
    // gte, gt, lte, lt
    let queryStr = JSON.stringify(queryObj)
    
    queryStr = JSON.parse(queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`))


    const query =  User.find(queryStr)
    

    // execute the query
    const users = await query

    res.status(200).json({
      status: 'success',
      results: users.length,
      data: { users}
    })

  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err
    })
  }
}

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)

    res.status(200).json({
      status: 'success',
      data: { user }
    })
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err
    })
  }
}