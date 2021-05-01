const express = require('express')
// const path = require('')
const mongoose = require('mongoose')
const app = express()

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
app.use('api/operations', require('./routes/api/operations'))


app.listen(5000, () => {
  console.log('Server started on:', 5000)
})