const express = require('express');
const transactionController = require('../controllers/transactionController');
const router = express.Router();

router.post('/sync', transactionController.syncTransactions);
router.get('/:accountId', transactionController.getTransactions);

module.exports = router;