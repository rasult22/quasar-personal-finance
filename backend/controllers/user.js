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
    // 1A. Filtering
    const queryObj = {...req.query }
    const excludeFields = ['page', 'sort', 'limit', 'fields']

    excludeFields.forEach(field => delete queryObj[field])

    // 1B. Advanced filtering
    // {rating: 3, balance: { $gte: 5 }}
    
    // gte, gt, lte, lt
    let queryStr = JSON.stringify(queryObj)
    
    queryStr = JSON.parse(queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`))


    let query =  User.find(queryStr)
    
    // 2) Sorting
    if(req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ')
      query = query.sort(sortBy)

      // sort('balance rating')
    } else {
      query = query.sort('-createdAt')
    }


    // 3) Field limiting
    if(req.query.fields) {
      let fields = req.query.fields.split(',').join(' ')

      // projecting
      // query = query.select('name balance rating')
      query = query.select(fields)
    } else {
      query = query.select('-__v')
    }

    // 4) Pagination
   
    /* 
      page=2&limit=10    
        (page 1 | 1-10)
        (page 2 | 11-20)
        (page 3 | 21-30)
      query = query.skip(10).limit(10) - skipping first 10 items and take the next 10 items
    */
    const page = req.query.page * 1 || 1
    const limit = req.query.limit * 1 || 20
    const skip = (page - 1) * limit

    query = query.skip(skip).limit(limit)
    
    if(req.query.page) {
      const usersCount = await User.countDocuments()
      if(skip >= usersCount) throw new Error('This page does not exits')
    }
    // execute the query
    const users = await query

    res.status(200).json({
      status: 'success',
      page: page,
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