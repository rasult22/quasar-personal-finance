const mongoose= require('mongoose')
const bcrypt = require('bcryptjs')
const crypto = require('crypto')
// name, email, photo, password, passwordConfirm


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'a user must have a name'],
    unique: true,
    trim: true,
    minlength: [2, 'A username must have more than or equal to 2 characters']
  },
  email: {
    type: String,
    required: [true, 'a user must have an email adress'],
    trim: true,
    unique: true,
    lowercase: true,
    validate: {
      message: 'Invalid email address. The format should be: test@test.anything',
      validator: function (value) {
        let regex = /^[^\s@]+@[^\s@]+$/
        return regex.test(value)
      }
    }
  },
  avatar: {
    type: String
  },
  role: {
    type: String,
    enum: ['user', 'premium-user', 'admin'],
    default: 'user'
  },
  password: {
    type: String,
    required: [true, 'A password cannot be an empty string'],
    minlength: [8, 'A password length must be more than or equal to 8'],
    select: false,
    validate: {
      message: 'Invalid password. A password must contain at least one number, and may contain only the following symbols: from a to z and !@#$%&*()_=[]{}:;"\\|,.',
      validator: function (value) {
        const regex = /[^a-z0-9`!@#$%&*()_=[\]{}:;"\\|,.]/gi // whitelist
        return !regex.test(value) && /[^A-z]/gi.test(value) && /[^0-9]/gi.test(value) // test if symbols in whitelist and contain numbers and letters at the same time 
      }
    }
  },
  passwordConfirm: {
    type: String,
    required: true,
    validate: {
      message: 'Invalid password confirmation. Passwords aren\'t the same',
      validator: function (value) {
        return value === this.password
      }
    }
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false
  }
})

userSchema.pre('save', async function(next) {
  // Only run this function if password was actually modified
  if(!this.isModified('password')) return next()

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12)

  this.passwordConfirm = undefined
  next()
})

userSchema.pre('save', async function(next) {
  if(!this.isModified('password') || this.isNew) return next()

  this.passwordChangedAt =  Date.now() - 1000
  next()

})

userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword)
}
userSchema.methods.createPasswordResetToken = function () {
  // decrypted
  const resetToken = crypto
    .randomBytes(32)
    .toString('hex')
  
  // hold in db encrypted
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex')

  // Expire time
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000

  return resetToken
}
userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  console.log(this.passwordChangedAt)
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10)
    return changedTimestamp > JWTTimestamp
  }
  return false
}

const User = mongoose.model('user', userSchema)

module.exports = User