// Validation - checking if entered value is right format
// for each field in our document schema


// Sanitization - is to ensure that the inputted data is
// basically clean, so that there is no malicious code being
// injected into our databases, or into the application itself



const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A user must have name'],
    unique: true,
    trim: true,
    maxlength: [40, 'A username must have less or equal to 40 characters'],
    minlength: [2, 'A username must have more or equal to 2 characters']
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


// CHECK VALIDATOR.JS FOR MORE ADVANCED VALIDATIONS