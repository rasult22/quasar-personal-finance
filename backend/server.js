const express = require('express')
// const path = require('')
const mongoose = require('mongoose')
const app = express()

mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error'))
db.once('open', function() {
  // we are connected
})

// Operations API route
app.use('api/operations', require('./routes/api/operations'))