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

exports.getUserStats = async (req, res) => {
  try {
    const stats = await User.aggregate([
      {
        $match: {
          rating: {$gte: 1.5}
        }
      },
      {
        $group: {
          _id: '$createdAt',
          numUsers: { $sum: 1},
          avgRating: {
            $avg: '$rating'
          },
          avgBalance: {
            $avg: '$balance'
          },
          minBalance: {
            $min: '$balance'
          },
          maxBalance: {
            $max: '$balance'
          }
        }
      },
      {
        $sort: {
            avgBalance: 1
        }
      }
    ])
    res.status(200).json({
      status: 'success',
      data: { stats }
    })
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error
    })
  }
}

exports.getMonthlyPlan = async (req, res) => {
  try {
    const year = req.params.year * 1;
    const plan = User.aggregate([
      { 
        // Unwind will basically deconstruct an array field from the info documents
        // and output one document for each element of the array
        $unwind: '$arrayProperty'
      },
      {
        $match: {
          arrayProperty: {
            $gte: 10000,
            $lte: year
          }
        }
      },
      {
        $group: {
          _id: { $someOperator: '$arrayProperty'},
          numSome: { $add: 1},
          somethings: {$push: '$name'} // will create a array of $numSome elements with value names of $arrayProps 
        }
      },
      {
        $addField: {
          something: '$_id' // We add a field $something with value from $_id
        }
      },
      {
        $project: {
          _id: 0  // remove $_id
        }
      },
      {
        $sort: {
          numSome: -1 // Sorting in decenting order
        }
      },
      {
        $limit: 6 // limit output with 6 documents
      }
      
    ])

    // OUTPUT:  THE COUNT OF ARRAYPROPERTIES (IT'S DIVIDED AND GROUPED WITH OPERATOR)
    res.status(200).json({
      status: 'success',
      data: { plan }
    })
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error
    })
  }
}
