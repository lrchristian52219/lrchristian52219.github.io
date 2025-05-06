const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authenticateAdmin = require('../middleware/authenticateAdmin'); // Middleware to authenticate admins

// Routes for managing products
router.post('/products', adminController.addProduct); // Add a new product
router.put('/products/:id', adminController.editProduct); // Edit an existing product
router.delete('/products/:id', adminController.deleteProduct); // Delete a product
router.post('/products/bulk', adminController.bulkUploadProducts); // Bulk upload products
router.get('/products', adminController.getAllProducts); // Get all products
router.get('/products/:id', adminController.getProductById); // Get a product by ID

// Routes for managing categories
router.get('/categories', adminController.getAllCategories); // Get all categories
router.post('/categories', adminController.addCategory); // Add a new category
router.put('/categories/:id', adminController.editCategory); // Edit an existing category
router.delete('/categories/:id', adminController.deleteCategory); // Delete a category

// Routes for managing orders
router.get('/orders', authenticateAdmin, adminController.getAllOrders); // Get all orders
router.get('/orders/:id', authenticateAdmin, adminController.getOrderDetails); // Get order details

module.exports = router;