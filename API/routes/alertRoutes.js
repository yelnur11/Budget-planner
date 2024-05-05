const express = require('express');
const alertController = require('../controllers/alertController');
const router = express.Router();

router.get('/:userId', alertController.getAlerts);
router.post('/', alertController.createAlert);

module.exports = router;