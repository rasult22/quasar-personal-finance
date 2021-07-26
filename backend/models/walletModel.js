const mongoose= require('mongoose')


const walletSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'a wallet must have a name']
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  }
})

const Wallet = mongoose.model('wallet', walletSchema)

module.exports = Wallet