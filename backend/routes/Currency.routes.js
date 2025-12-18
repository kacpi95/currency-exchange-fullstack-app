const express = require('express');
const router = express.Router();
const Currency = require('../controllers/Currency.controller');

router.get('/current', Currency.getCurrentCurrency);
router.get('/history/:currency/:start/:end', Currency.getOldCurrency);

module.exports = router;
