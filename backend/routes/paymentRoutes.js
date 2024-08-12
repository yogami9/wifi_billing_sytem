const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

// Route to handle payment processing
router.post('/pay', paymentController.processPayment);

module.exports = router;
