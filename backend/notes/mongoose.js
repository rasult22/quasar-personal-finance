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
    require: [true, 'A user must have name']
  },
  balance: {
    type: Number,
    require: [true, 'A user must have a balance']
  },
  rating: {
    type: Number,
    default: 3.0
  }

})

