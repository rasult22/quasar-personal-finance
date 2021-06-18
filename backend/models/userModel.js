const mongoose= require('mongoose')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A user must have name'],
    unique: true,
    trim: true
  },
  balance: { // ?????????????????
    type: Number,
    required: [true, 'A user must have a balance']
  },
  rating: {
    type: Number,
    default: 3.0
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
  // images: [String]  array of strings
  // accounts:[
  //   {
  //     type: 'bank'
  //   },
  //   {
  //     type: 'cash'
  //   {
  //     type: 'crypto'
  //   }
  // ],
  

})


const User = mongoose.model('user', userSchema)

module.exports = User