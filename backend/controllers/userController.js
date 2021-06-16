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
exports.updateUser = (req, res) => {

}
exports.deleteUser = (req, res) => {

}

exports.getUsers = (req, res) => {}

exports.getUserById = (req, res) => {}