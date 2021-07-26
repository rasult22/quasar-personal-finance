const mongoose= require('mongoose')

const transactionSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now()
  },
  wallet: {
    //
  },
  amount: {
    type: Number,
    required: [true, 'transaction must have a value']
  },
  category: {
    type: Object,
    required: [true, 'transaction must have a category']
  },
  note: {
    type: String,  
    default: '-',
    trim: true
  },
  type: {
    type: String,
    enum: ['expense', 'income', 'transfer?', 'debt/loan'],
    required: [true, 'transaction must have a type']
  },
  location:{
    type: {
      type: String,
      default: 'Point',
      enum: ['Point']
    },
    coordinates: [Number],
    address: String,
    description: String

  },
  currency: {
    type: Object
  }
})


const Operation = mongoose.model('operation', operationSchema)

module.exports = Operation