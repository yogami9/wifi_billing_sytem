const express = require('express');
const router = express.Router();
const planController = require('../controllers/planController');

// Define the route for getting plans
router.get('/plans', planController.getPlans);

module.exports = router;
