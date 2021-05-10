const express = require('express')
// const path = require('')
const mongoose = require('mongoose')
const app = express()

// Middleware for letting client poss data
app.use(express.json())

app.use(express.urlencoded({ extended: false }))

mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error'))
db.once('open', function() {
  // we are connected
  console.log('MongoDB: We are connected')
})

// Operations API route
app.use('/api/v1/operations', require('./routes/api/v1/operations'))


app.listen(5000, () => {
  console.log('Server started on:', 5000)
})