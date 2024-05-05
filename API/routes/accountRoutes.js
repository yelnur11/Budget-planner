const express = require('express');
const accountController = require('../controllers/accountController');
const router = express.Router();

router.post('/', accountController.addAccount);
router.get('/:accountId', accountController.getAccount);
router.delete('/:accountId', accountController.deleteAccount);

module.exports = router;