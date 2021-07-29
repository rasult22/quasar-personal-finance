// API for wallets
const express = require('express');
const router = express.Router();

const auth = require('../../../controllers/auth')
const {createWallet} = require('../../../controllers/wallet')


router.post('/', auth.protect, createWallet)





module.exports = router