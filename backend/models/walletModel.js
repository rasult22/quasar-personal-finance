const mongoose= require('mongoose')


const walletSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: [true, 'a wallet must have a name']
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'A wallet must have owner-user']
  },
  balance: {
    type: Number,
    required: [true, 'A wallet must have a balance']
  },
  currency: {
    type: Object,
    required: [true, 'A wallet must have a currency']
  }
})

const Wallet = mongoose.model('wallet', walletSchema)

module.exports = Wallet