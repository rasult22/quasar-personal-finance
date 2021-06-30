const mongoose= require('mongoose')
const slugify = require('slugify')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A user must have name'],
    unique: true,
    trim: true
  },
  slug: String,
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
  },
  secretUser: {
    type: Boolean,
    default: false
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
  

}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})

// Virtual Property
userSchema.virtual('pseudoname').get(function () {
  return this.rating > 4 ? 'TIGER' : 'CAT'
})

// QUERY MIDDLEWARE 
// userSchema.pre('find', function(next) {
userSchema.pre(/^find/, function(next) {
  this.find({ secretUser: { $ne: true }})
  next()
})


// AGGREGATION MIDDLEWARE
userSchema.pre('aggregate', function(next) { 
  console.log(this.pipeline().unshift({ $match: {secretUser: {$ne: true}} }))
  next()
})
const User = mongoose.model('user', userSchema)

module.exports = User