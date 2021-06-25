const User = require('../models/userModel')
const APIFeatures = require('../utils/apiFeatures')

exports.aliasTopUsers = (req, res, next) => {
  req.query.limit = '3'
  req.query.sort = '-rating'
  req.query.fields = 'name,rating,balance'
  next()
}
 
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
    const features = new APIFeatures(User.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate()
    const users = await features.mongoQuery

    res.status(200).json({
      status: 'success',
      page: features.paginationPage,
      results: users.length,
      data: { users}
    })

  } catch (err) {
    console.log(err)
    res.status(400).json({
      status: 'fail',
      message: err?.message || err
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


