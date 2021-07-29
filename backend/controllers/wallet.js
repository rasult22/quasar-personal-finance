const Wallet = require('../models/walletModel')
const APIFeatures = require('../utils/apiFeatures')
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