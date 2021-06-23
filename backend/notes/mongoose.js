const mongoose= require('mongoose')
/*
  What is mongoose?

  Mongoose is an Object Data Modeling (ODM) library for 
  MongoDB and Node.js, a higher level of abstraction;

  Mongoose allows for rapid and simple development of mongoDB database
  interactions;

  Features:
  1. Schemas to model data and relationships
  2. Easy data validation
  3. Simple query API
  4. Middleware
  etc...


  Mongoose schema: where we model our data, by describing
  the structure of the data, default values, and validation;

  Mongoose model: a wrapper for the schema, providing an
  interface to the database for CRUD operations. 

   -----------------------              ----------------------- 
  |                       |            |                       |
  |      SCHEMA           |  ------>   |        MODEL          |
  |                       |            |                       |
   -----------------------              -----------------------
   

  
 Mongoose is all about Models 

 Models is a bit like classes in JavaScript

 We create models in order to create documents using it
 and also to query update and delete these documents

 To create model we need schema.
*/


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, 'A user must have name'],
    unique: true
  },
  balance: {
    type: Number,
    require: [true, 'A user must have a balance']
  },
  rating: {
    type: Number,
    default: 3.0,
    // select: false - if we don't want to send it to client by default
  }

})


const User = mongoose.model('user', userSchema)

const testUser = new User( {
  name: 'Rassulzhan',
  balance: 27000.00
})

// Save to collection
testUser.save().then(doc => {
  console.log(doc)
}).catch(e => {
  console.log('ERROR:', e)
})







User.find({
  rating: 3
})

User.find().where('rating').equals(3)

 // build query
    // 1A. Filtering
    const queryObj = {...req.query }
    const excludeFields = ['page', 'sort', 'limit', 'fields']

    excludeFields.forEach(field => delete queryObj[field])

    // 1B. Advanced filtering
    // {rating: 3, balance: { $gte: 5 }}
    
    // gte, gt, lte, lt
    let queryStr = JSON.stringify(queryObj)
    
    queryStr = JSON.parse(queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`))


    let query =  User.find(queryStr)
    
    // 2) Sorting
    if(req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ')
      query = query.sort(sortBy)

      // sort('balance rating')
    } else {
      query = query.sort('-createdAt')
    }

    // execute the query
    const users = await query