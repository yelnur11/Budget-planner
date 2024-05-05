const express = require('express');
const tipsController = require('../controllers/tipsController');
const router = express.Router();

router.get('/', tipsController.getTips);

module.exports = router;