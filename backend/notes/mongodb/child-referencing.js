
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

const tour = await Tour.findById(req.params.id).populate('guides')