const AppError = require('../utils/appError')

const handleCastErrorDB = (error) => {
  const message = `Invalid ${error.path}:${error.value}`
  return new AppError(message, 400)
}
const handleDuplicateFieldsDB = error => {
  const message = `Duplicate field value: "${error.keyValue.name}", please use another value`
  return new AppError(message, 400)
}
const handleValidationErrorDB = error => {
  const errors = Object.values(error.errors).map(item => item.message)
  const message = `Invalid input data: ${errors.join('. ')}`
  return new AppError(message, 400)
}
const handleJWTError = () => new AppError('Invalid token. Please log in again!', 401)
const handleJWTExpiredError = () => new AppError('Your token has expired. Please log in again!', 401)

const sendErrorDev = (error, res) => {
  res.status(error.statusCode).json({
    status: error.status,
    message: error.message,
    stack: error.stack,
    error
  })
}
const sendErrorProd = (error, res) => {
  // Operational, trusted error: send message to client
  if(error.isOperational) {
    res.status(error.statusCode).json({
      status: error.status,
      message: error.message
    })

    // Programming or other unknown error: don't leak error details 
  } else {
    // 1. Log error
    console.error('ERROR', error)

    // 2. Send generic error
    res.status(500).json({
      status: 'error',
      message: 'Something went very wrong'
    })
  }
}

module.exports = (error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || 'error'
 
  if(process.env.NODE_ENV.trim() !== 'production') {
    sendErrorDev(error, res)
  } else {
    let errorClone = JSON.parse(JSON.stringify(error))
    if(errorClone.name === 'CastError') {
      errorClone = handleCastErrorDB(errorClone)
    }
    if(errorClone.code === 11000) errorClone = handleDuplicateFieldsDB(errorClone)
    if(errorClone.name === 'ValidationError') errorClone = handleValidationErrorDB(errorClone)

    if(errorClone.name === 'JsonWebTokenError') errorClone = handleJWTError()
    if(errorClone.name === 'TokenExpiredError') errorClone = handleJWTExpiredError()

    sendErrorProd(errorClone, res)
  }
 
}