
class APIFeatures {
  constructor (mongoQuery, queryExpress, paginationPage = 0) {
    this.mongoQuery = mongoQuery
    this.queryExpress = queryExpress
    this.paginationPage = paginationPage
  }

  filter () {
    const queryObj = {...this.queryExpress }
    const excludeFields = ['page', 'sort', 'limit', 'fields']

    excludeFields.forEach(field => delete queryObj[field])

    let queryStr = JSON.stringify(queryObj)
    queryStr = JSON.parse(queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`))
    
    this.mongoQuery = this.mongoQuery.find(queryStr)

    return this
  }

  sort () {
    if(this.queryExpress.sort) {
      const sortBy = this.queryExpress.sort.split(',').join(' ')
      this.mongoQuery = this.mongoQuery.sort(sortBy)
    } else {
      this.mongoQuery = this.mongoQuery.sort('-createdAt')
    }

    return this
  }


  limitFields () {
    if(this.queryExpress.fields) {
      let fields = this.queryExpress.fields.split(',').join(' ')
      this.mongoQuery = this.mongoQuery.select(fields)
    } else {
      this.mongoQuery = this.mongoQuery.select('-__v')
    }

    return this
  }

  paginate () {
    const page = this.queryExpress?.page * 1 || 1
    const limit = this.queryExpress?.limit * 1 || 20
    const skip = (page - 1) * limit
    this.paginationPage = page

    this.mongoQuery = this.mongoQuery.skip(skip).limit(limit)
    
    return this
  }
}


module.exports = APIFeatures