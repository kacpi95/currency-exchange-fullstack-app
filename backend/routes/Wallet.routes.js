const express = require('express');
const router = express.Router();
const authMiddleware = require('../utils/authMiddleware');

router.get('/', authMiddleware);
router.post('/deposit', authMiddleware);

module.exports = router;
