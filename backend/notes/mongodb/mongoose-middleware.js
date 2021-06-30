
/*
  PRE HOOKS
  POST HOOKS


  There are 4 types of middleware in mongoose:
  1. Document
  2. Query
  3. Aggregate
  4. Model 
*/


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
// ---------------------------------------------------------

// Query middleware allows us to run functions before or after a certain query is executed

// QUERY MIDDLEWARE 
// userSchema.pre('find', function(next) {
  userSchema.pre(/^find/, function(next) {
    this.find({ secretUser: { $ne: true }})
    this.startTime = Date.now()
    next()
  })
  
  userSchema.post(/^find/, function(docs, next) {
    console.log(Date.now() - this.startTime + 'ms')
    console.log(docs);
    next()
  })



// AGGREGATION MIDDLEWARE
userSchema.pre('aggregate', function(next) { 
  console.log(this.pipeline().unshift({ $match: {secretUser: {$ne: true}} }))
  next()
})