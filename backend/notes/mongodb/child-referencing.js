
// Modelling Tour Guides Child Referencing
{
  guides: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    }
  ]
}


// input: ['2hjj3hk1k2lh4h2j','32jj3j2j3jlbhikh23']



// Populating Tour Guides

const tour = await Tour.findById(req.params.id).populate({
  path: 'guides',
  select: '-__v -passwordChangedAt'
}
  )



// Avoid using the same code many times in the other endpoints
// Write a document middleware instead: 

tourSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'guides',
    select: '-__v -passwordChanged'
  })

  next()
})