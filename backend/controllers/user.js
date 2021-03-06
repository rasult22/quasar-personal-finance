const User = require('../models/userModel')
const APIFeatures = require('../utils/apiFeatures')
const AppError = require('../utils/appError')
const catchAsync = require('../utils/catchAsync')

const filterObj = (obj, propWhiteList) => {
  const newObj = {}
  Object.keys(obj).forEach( key => {
    if(propWhiteList.includes(key)) {
      newObj[key] = obj[key]
    }
  })
  return newObj
}
exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, {
    active: false
  })

  res.status(204).json({
    status: 'success',
    data: null
  })
})

exports.updateMe = catchAsync(async (req,res, next) => {
  // 1) Create error if user POSTs password data
  if(req.body.password || req.body.passwordConfirm) {
    return next(new AppError('This route is not for password updates.', 400))
  }

  // 2) Update user document
  const filteredBody = filterObj(req.body, ['name', 'email'])
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
     new: true,
     runValidation: true
  })

  res.status(200).json({
    status: 'success',
    user: updatedUser
  })
})

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
    
    if(!user) {
      return next(new AppError('User not found', 404))
    }

    res.status(200).json({
      status: 'success',
      data: { user }
    })
})
exports.deleteUser = catchAsync(async (req, res, next) => {
    const user = await User.findByIdAndDelete(req.params.id)
    
    if(!user) {
      return next(new AppError('User not found', 404))
    }

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

    if(!user) {
      return next(new AppError('User not found', 404))
    }

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



