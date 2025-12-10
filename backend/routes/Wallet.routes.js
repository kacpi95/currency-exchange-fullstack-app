const express = require('express');
const router = express.Router();
const authMiddleware = require('../utils/authMiddleware');
const WalletController = require('../controllers/Wallet.controller');

router.get('/', authMiddleware, WalletController.getWallet);
router.post('/deposit', authMiddleware, WalletController.getDeposit);

module.exports = router;
