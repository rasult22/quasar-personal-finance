const mongoose= require('mongoose')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A user must have name'],
    unique: true,
    trim: true,
    maxlength: [40, 'A username must have less or equal to 40 characters'],
    minlength: [2, 'A username must have more or equal to 2 characters'],
    // validate: {
    //   validator: hey.isAlpha,
    //   message: 'This field gotta only contain alphabetic characters'
    // }
  },
  slug: String,
  balance: { // ?????????????????
    type: Number,
    required: [true, 'A user must have a balance']
  },
  rating: {
    type: Number,
    default: 3.0,
    min: [1,' Rating must be above 1.0'],
    max: [5, 'Rating must be below 5.0']
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  rang: {
    type: String,
    required: [true, 'A user must have a rang'],
    validate: {
      message: 'A user with a {VALUE} rang cannot have a rating less that 4.0',
      validator: function (value) {
        if (value === 'Hokage') return this.rating > 4.0
        return true
      }
    },
    enum:{ 
        values: ['Genin', 'Chounin', 'Zhounin', 'Sanin', 'Hokage'],
        message: 'Rang is either: Genin, Chounin, Zhounin, Sanin, Hokage' 
      }
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