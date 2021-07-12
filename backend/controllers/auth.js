const User = require('../models/userModel')
const crypto = require('crypto')
const AppError = require('../utils/appError')
const catchAsync = require('../utils/catchAsync')
const jwt =  require('jsonwebtoken')
const sendEmail = require('../utils/email')

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  })
}

/*
  SEND JWT VIA COOKIE
  res.cookie('jwt', token, { 
    expires: new Date(Date.now() - process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
    secure: true,
    httpOnly: true
  })
*/

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm
  })
  const token = signToken(newUser._id)

  res.status(201).json({
    status:'success',
    token,
    data: { user: newUser }
  })
})  

exports.login = catchAsync(async (req, res, next) => {
  const {email, password } = req.body

  // 1) Check if email and password exist
  if(!email || !password) {
    return next(new AppError('Please provide email and password', 400))
  }
  // 2) Check if user exists && password is correct
  const user = await User.findOne({ email }).select('+password')
 
  if(!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401))
  }
  // 3) If everyting ok, send toke to client
  const token = signToken(user._id)
  res.status(200).json({
    status: 'success',
    token
  })
})

exports.protect = catchAsync(async (req, res, next) => {
  let token;

  // 1) Getting token and check if it's therefore
  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer ')){
    token = req.headers.authorization.split(' ')[1]
  }
  if(!token) {
    return next(new AppError('You aren\'t logged in. Please log in to get access', 401))
  }

  // 2) Verification token
  const decoded =  jwt.verify(token, process.env.JWT_SECRET)

  // 3) Check if user still exists
  const currentUser = await User.findById(decoded.id)
  if(!currentUser) return next(new AppError('The user belonging to this token does no longer exist.', 401))
 
  // 4) Check if user changed password after the JWT was issued
  if(currentUser.changedPasswordAfter(decoded.iat)){
    return next(new AppError('User recently changed password! Please log in again', 401))
  }

  req.user = currentUser
  next()
})

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    // roles ['admin', 'premium']
    console.log(req.user.role)
    if(!roles.includes(req.user.role)) {
      return next(new AppError('You don\'t have permission to perform this action', 403))
    }

    next()
  }
}

exports.forgotPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on POSTed email
  const user = await User.findOne({ email: req.body.email })
  // console.log(user)

  if(!user) {
    return next(new AppError('There\'s no user with this email address.', 404))
  }
  
  // 2) Generate the random reset token
  const resetToken = user.createPasswordResetToken()
  await user.save({validateBeforeSave: false})

  // 3) Send it to user's email
  const resetURL = `${req.protocol}://${req.get('host')}/api/v1/users/resetPassword/${resetToken}`

  const message = `Forgot your password? Sumbit a PATCH request with your new password and passwordConfirm to ${resetURL}.\n If you didn't, then ignore this message. `

  try {
    await sendEmail({
      email: user.email,
      subject: `Your password reset token (valid 10 min)`,
      message
    })
    
    res.status(200).json({
      status: 'success',
      message: 'Token sent to email'
    })
  } catch (error) {
    console.log(error)
    user.passwordResetToken = undefined
    user.passwordResetExpires = undefined
    await user.save({validateBeforeSave: false})

    return next(new AppError('There was an error sending the email. Try again later', 500))
  }
})

exports.resetPassword = async (req, res, next) => {
  
  // 1) Get user basen on the token
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');
   
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() }
  })

  // 2) If token has not expired, and there is user, set the new password
  if(!user) return next(new AppError('Token is invalid or has expired', 400))

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;

  await user.save()

  // 3) Update changedPasswordAt property for the user
  // Implemented via mongoose model pre save middleware 


  // 4) Log the user in, send JWT

  const token = signToken(user._id)

  res.status(200).json({
    status: 'success',
    token
  })
}

exports.updatePassword = catchAsync(async (req, res, next) => {
  // 1. Get User from collection
  const currentUser = await User.findById(req.user._id).select('+password')
  console.log(currentUser)
  // 2. Check if POSTed current password is correct
  const currentPassword = req.body.currentPassword
  const newPassword = req.body.password
  const newPasswordConfirm = req.body.passwordConfirm
  if (!(await currentUser.correctPassword(currentPassword, currentUser.password))) {
    return next(new AppError('Incorrect password. Please try again or reset your password via email verification', 400))
  }

  // 3. If so, update password
  currentUser.password = newPassword
  currentUser.passwordConfirm = newPasswordConfirm

  await currentUser.save()

  // 4. Log user in, send JWT
  const token =  signToken(currentUser._id)

  res.status(200).json({
    status: 'success',
    token
  })

})