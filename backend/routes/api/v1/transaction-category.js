const express = require('express')
const router = express.Router()

const auth = require('../../../controllers/auth')
const {create} = require('../../../controllers/transaction-category')


router.post('/', auth.protect, create)


module.exports = router;