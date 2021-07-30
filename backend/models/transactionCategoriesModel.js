const mongoose= require('mongoose')

const transactionCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'a category must have a name'],
    unique: true,
    trim: true
  },
  icon: {
    type: String,
    required: [true, 'category must have an icon']
  },
  type: {
    type: String,
    enum: ['expense', 'income', 'transfer?', 'debt/loan'],
    required: [true, 'category must have transaction type']
  }
})


const TransactionCategory = mongoose.model('transaction-category', transactionCategorySchema)
module.exports = TransactionCategory
