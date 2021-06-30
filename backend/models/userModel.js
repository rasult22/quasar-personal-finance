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

// Middlewares
// DOCUMENT MIDDLEWARE: runs before the .save() command and .create()
// .insertMany() -- will not trigger this middleware
userSchema.pre('save', function (next) {
  this.slug = slugify(this.name, {lower: true})
  next()
})

userSchema.pre('save', function (next) {
  // do whatever you want
  console.log('HAHAHAHAHAHAHAAHAHAAHA')
  next()
})

userSchema.post('save', function (doc, next) {
  console.log(doc)
  next()
})

const User = mongoose.model('user', userSchema)

module.exports = User