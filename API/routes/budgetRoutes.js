const express = require('express');
const budgetController = require('../controllers/budgetController');
const router = express.Router();

router.post('/forecast', budgetController.createForecast);
router.get('/:userId', budgetController.getBudget);
router.put('/:userId', budgetController.updateBudget);

module.exports = router;