const mongoose= require('mongoose')


const currencySchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: [true, 'a currency must have a name']
  },
  sign: {
    type: String,
    unique: true,
    required: [true, 'a currency must have a sign character']
  },

})

const Currency = mongoose.model('currency', currencySchema)

module.exports = Currency