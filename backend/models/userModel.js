const mongoose= require('mongoose')
const bcrypt = require('bcryptjs')
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
  password: {
    type: String,
    required: [true, 'A password cannot be an empty string'],
    minlength: [8, 'A password length must be more than or equal to 8'],
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

const User = mongoose.model('user', userSchema)

module.exports = User