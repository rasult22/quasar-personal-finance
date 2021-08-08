const Wallet = require('../models/walletModel')
const APIFeatures = require('../utils/apiFeatures')
const AppError = require('../utils/appError')
const catchAsync = require('../utils/catchAsync')


exports.createWallet = catchAsync(async (req, res) => {
  const newWallet = await Wallet.create({...req.body, user: req.user.id })

  res.status(201).json({
    status: 'success',
    data: {
      wallet: newWallet
    }
  })
})

exports.getAll = catchAsync(async (req, res) => {
  const features = new APIFeatures(Wallet.find(), req.query)
  .filter()
  
  const wallets = await features.mongoQuery

  res.status(200).json({
    status: 'success',
    results: wallets.length,
    data: {
      wallets
    }
  })
})


exports.updateWallet = catchAsync( async (req, res, next) => {
  const wallet = await Wallet.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  })

  if(!wallet) {
    return next(new AppError('wallet not found', 404))
  }
  
  res.status(200).json({
    status: 'Success',
    data: {
      wallet
    }
  })
})

exports.deleteWallet = catchAsync(async (req, res, next) => {
  const wallet = await Wallet.findByIdAndDelete(req.params.id)
  
  if(!wallet) {
    return next(new AppError('wallet not found', 404))
  }

  res.status(204).json({
    status: 'success',
    data: null
  })
})

exports.changeBalance = catchAsync(async (req, res, next) => {
  
  // 1. Figure out transaction type
  // 2. Save amount from body
  // 3. Apply transaction opeartions
})