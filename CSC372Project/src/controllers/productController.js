const productModel = require('../models/productModel');
const db = require('../database/db'); // Correct path to the db module

// Get all products
const getAllProducts = (req, res) => {
    const { category, search } = req.query;

    try {
        const products = productModel.getAllProducts(category, search);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch products' });
    }
};

// Get product details by ID
const getProductById = (req, res) => {
    const { id } = req.params;

    try {
        const product = productModel.getProductById(id);
        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch product details' });
    }
};

// Get featured products
const getFeaturedProducts = (req, res) => {
    console.log('getFeaturedProducts controller called'); // Debug log
    try {
        const products = productModel.getFeaturedProducts(); // Call the model function
        res.status(200).json(products); // Send the products as a JSON response
    } catch (error) {
        console.error('Error fetching featured products:', error);
        res.status(500).json({ error: 'Failed to fetch featured products' });
    }
};

// Get products by category
const getProductsByCategory = (req, res) => {
    const { category_id } = req.params;

    try {
        const products = productModel.getProductsByCategory(category_id);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch products by category' });
    }
};

// Add a product to the cart
const addToCart = (req, res) => {
    const { user_id, product_id, quantity } = req.body;

    if (!user_id || !product_id || !quantity) {
        return res.status(400).json({ error: 'Missing required fields: user_id, product_id, or quantity' });
    }

    try {
        const cart_id = productModel.getOrCreateCart(user_id);
        console.log('Cart ID:', cart_id); // Log the cart ID
        productModel.addToCart(cart_id, product_id, quantity); // Use addToCart here
        res.status(201).json({ message: 'Product added to cart successfully' });
    } catch (error) {
        console.error('Error in addToCart:', error);
        res.status(500).json({ error: 'Failed to add product to cart' });
    }
};

// Remove a product from the cart
const removeFromCart = (req, res) => {
    const { product_id } = req.params;

    try {
        productModel.removeFromCart(product_id);
        res.status(200).json({ message: 'Product removed from cart' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to remove product from cart' });
    }
};

// View cart
const viewCart = (req, res) => {
    try {
        const cart = productModel.viewCart();
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch cart' });
    }
};

// Checkout
const checkout = (req, res) => {
    try {
        productModel.checkout();
        res.status(200).json({ message: 'Checkout successful' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to complete checkout' });
    }
};

// Get products
const getProducts = (req, res) => {
    const { category_id } = req.query;

    try {
        const products = category_id
            ? db.prepare('SELECT id, name, description, price, image_url FROM Products WHERE category_id = ?').all(category_id)
            : db.prepare('SELECT id, name, description, price, image_url FROM Products').all();

        res.status(200).json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
};

module.exports = {
    getAllProducts,
    getProductById,
    getFeaturedProducts,
    getProductsByCategory,
    addToCart,
    removeFromCart,
    viewCart,
    checkout,
    getProducts,
};