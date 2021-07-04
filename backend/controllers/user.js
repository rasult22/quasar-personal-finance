const User = require('../models/userModel')
const APIFeatures = require('../utils/apiFeatures')
const catchAsync = require('../utils/catchAsync')


exports.aliasTopUsers = (req, res, next) => {
  req.query.limit = '3'
  req.query.sort = '-rating'
  req.query.fields = 'name,rating,balance'
  next()
}
 
exports.createUser = catchAsync(async (req, res, next) => {
    const newUser = await User.create(req.body)
  
    res.status(201).json({
      status: 'success',
      data: { 
        user: newUser
      } 
    })
})
exports.updateUser = catchAsync(async (req, res, next) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    })

    res.status(200).json({
      status: 'success',
      data: { user }
    })
})
exports.deleteUser = catchAsync(async (req, res, next) => {
    const user = await User.findByIdAndDelete(req.params.id)

    res.status(204).json({
      status: 'success',
      data: null
    })
})

exports.getUsers = catchAsync(async (req, res, next) => {
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
})

exports.getUserById = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.params.id)

    res.status(200).json({
      status: 'success',
      data: { user }
    })
})

exports.getUserStats = catchAsync( async (req, res, next) => {
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
      count: stats.length,
      data: { stats }
    })
})

exports.getMonthlyPlan = catchAsync(async (req, res, next) => {
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
})



