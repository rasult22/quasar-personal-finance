/*  

  Node.js or Express can run in different environments.
  The most important one is:
  1. Development environment
  2. Production environment

  Depending on the environment we might use different
  databases or we might turn login on or off,
  or we might turn debugging on or off.
  And the other settings

  These all will be based on the environment variables
*/  
const express = require('express')
const app = express()
const dotenv = require('dotenv')

dotenv.config({path: './config.env'})

console.log(process.env)

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`App running on port ${port}`)
})