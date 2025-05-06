const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const authenticateUser = require('../middleware/middleware'); // Middleware to authenticate users

// Routes
router.post('/cart', authenticateUser, cartController.addToCart); // Add a product to the cart
router.get('/cart/:cart_id', cartController.viewCart); // View the cart
console.log('Registering /cart/:cart_id/checkout route');
router.post('/cart/:cart_id/checkout', authenticateUser, cartController.checkout); // Checkout
router.get('/cart', authenticateUser, cartController.getCart); // Get cart items

module.exports = router;