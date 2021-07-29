// API for wallets
const express = require('express');
const router = express.Router();

const auth = require('../../../controllers/auth')
const {createWallet, updateWallet, deleteWallet, getAll} = require('../../../controllers/wallet')

router.get('/', auth.protect, getAll)

router.post('/', auth.protect, createWallet)

router.patch('/:id', auth.protect, updateWallet)

router.delete('/:id', auth.protect, deleteWallet)





module.exports = router