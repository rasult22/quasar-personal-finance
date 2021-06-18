const mongoose= require('mongoose')

const operationSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now()
  },
  value: {
    type: Number,
    required: [true, 'an operation must have a value']
  },
  category: {

    type: String,
    required: [true, 'an operation must have a category'],
  },
  comments: {
    type: String,
    
    default: '-',
    trim: true
  },
  type: {
    type: String,
    required: [true, 'an operation must have a type']
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


const Operation = mongoose.model('operation', operationSchema)

module.exports = Operation