const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController'); // Corrected filename

//router.post('/logout', authController.logout);
router.post('/register', authController.register);
router.post('/login', authController.login);
// Route for admin login
router.post('/admin/login', authController.adminLogin);

module.exports = router;
