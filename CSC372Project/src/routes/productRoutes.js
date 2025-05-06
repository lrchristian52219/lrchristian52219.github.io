const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Routes for products
router.get('/products/featured', (req, res, next) => {
    console.log('Route /api/products/featured hit'); // Debug log
    next();
}, productController.getFeaturedProducts); // Get featured products

router.get('/products', productController.getAllProducts); // Get all products (with optional filters)
router.get('/products/category/:category_id', productController.getProductsByCategory); // Get products by category
router.get('/products/:id', productController.getProductById); // Get product details by ID

module.exports = router;