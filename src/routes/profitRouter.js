// routes/profitRouter.js
const express = require('express');
const router = express.Router();
const profitController = require('../controllers/profitController');

router.get('/', profitController.getProfit);

module.exports = router;
