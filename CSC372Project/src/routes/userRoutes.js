const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateUser = require('../middleware/middleware'); // Middleware to authenticate users

// Route to get the user's cart ID
router.get('/user/cart', authenticateUser, userController.getUserCart);

module.exports = router;