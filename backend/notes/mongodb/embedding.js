

const User = {}
const guides = ['343fddaads23', '2323sd2333sdae']

// Front should pass only array of user IDs
// Saving an guides object to a tour objects by user IDs (users with role guides) 

tourSchema.pre('save', async function(next) {
   const guidesPromises = this.guides.map(async id => await User.findById(id))

   this.guides = await Promise.all(guidesPromises)

   next()
}})