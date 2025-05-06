const cartModel = require('../models/cartModel');
const db = require('../database/db');
const fs = require('fs');
const path = require('path');

// Add a product to the cart
const addToCart = (req, res) => {
    console.log('Request body:', req.body);

    try {
        let cart_id = parseInt(req.body.cart_id, 10); // Ensure cart_id is an integer
        const product_id = parseInt(req.body.product_id, 10); // Ensure product_id is an integer
        const quantity = parseInt(req.body.quantity, 10); // Ensure quantity is an integer

        // Check if the cart exists
        let cartExists = db.prepare('SELECT id FROM Carts WHERE id = ?').get(cart_id);
        if (!cartExists) {
            console.log(`Cart ID ${cart_id} does not exist. Creating a new cart.`);
            const createCart = db.prepare(`
                INSERT INTO Carts (user_id, status) VALUES (?, 'new')
            `);
            const result = createCart.run(req.user.id); // Assuming `req.user.id` contains the logged-in user's ID
            cart_id = result.lastInsertRowid; // Get the new cart ID
            console.log(`New cart created with ID: ${cart_id}`);
        }

        // Check if the product exists
        const productExists = db.prepare('SELECT id FROM Products WHERE id = ?').get(product_id);
        if (!productExists) {
            console.error(`Product ID ${product_id} does not exist`);
            return res.status(400).json({ error: `Product ID ${product_id} does not exist` });
        }

        console.log('Inserting into CartProducts:', { cart_id, product_id, quantity });

        const existingItem = db.prepare(`
            SELECT * FROM CartProducts WHERE cart_id = ? AND product_id = ?
        `).get(cart_id, product_id);

        if (existingItem) {
            console.log('Item already exists in cart. Updating quantity.');
            db.prepare(`
                UPDATE CartProducts SET quantity = quantity + ? WHERE cart_id = ? AND product_id = ?
            `).run(quantity, cart_id, product_id);
        } else {
            console.log('Item does not exist in cart. Inserting new item.');
            db.prepare(`
                INSERT INTO CartProducts (cart_id, product_id, quantity) VALUES (?, ?, ?)
            `).run(cart_id, product_id, quantity);
        }

        res.status(200).json({ message: 'Product added to cart successfully', cart_id });
    } catch (error) {
        console.error('Error adding product to cart:', error.message, error.stack);
        res.status(500).json({ error: 'Failed to add product to cart' });
    }
};

// View cart
const viewCart = (req, res) => {
    const { cart_id } = req.params;

    try {
        console.log(`Fetching cart items for cart_id: ${cart_id}`);
        const cartItems = db.prepare(`
            SELECT c.id, c.product_id, c.quantity, p.name, p.price
            FROM CartProducts c
            JOIN Products p ON c.product_id = p.id
            WHERE c.cart_id = ?
        `).all(cart_id);

        console.log('Cart items fetched:', cartItems);
        res.status(200).json(cartItems);
    } catch (error) {
        console.error('Error fetching cart:', error);
        res.status(500).json({ error: 'Failed to fetch cart' });
    }
};

// Get cart items
const getCart = (req, res) => {
    console.log('getCart controller called'); // Debug log
    try {
        const cartItems = db.prepare(`
            SELECT c.id, c.product_id, c.quantity, p.name, p.price
            FROM CartProducts c
            JOIN Products p ON c.product_id = p.id
            WHERE c.cart_id = ?
        `).all(req.user.cart_id); // Replace with the correct cart ID logic

        console.log('Cart items fetched:', cartItems); // Debug log
        res.status(200).json(cartItems);
    } catch (error) {
        console.error('Error fetching cart:', error);
        res.status(500).json({ error: 'Failed to fetch cart' });
    }
};

// Checkout
const checkout = (req, res) => {
    const { cart_id } = req.params;

    try {
        console.log(`Processing checkout for cart_id: ${cart_id}`);

        // Check if the cart exists
        const cartExists = db.prepare('SELECT id FROM Carts WHERE id = ?').get(cart_id);
        if (!cartExists) {
            console.error(`Cart ID ${cart_id} does not exist`);
            return res.status(400).json({ error: `Cart ID ${cart_id} does not exist` });
        }

        // Fetch cart items
        const cartItems = db.prepare(`
            SELECT c.product_id, c.quantity, p.name, p.price
            FROM CartProducts c
            JOIN Products p ON c.product_id = p.id
            WHERE c.cart_id = ?
        `).all(cart_id);

        if (cartItems.length === 0) {
            console.log('Cart is empty');
            return res.status(400).json({ error: 'Cart is empty' });
        }

        console.log('Cart items:', cartItems);

        // Calculate total
        const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
        console.log(`Total calculated: ${total}`);

        // Save the order in the Orders table
        console.log('Inserting order into Orders table');
        const insertOrder = db.prepare(`
            INSERT INTO Orders (user_id, cart_id, total) VALUES (?, ?, ?)
        `);
        const result = insertOrder.run(req.user.id, cart_id, total); // Include user_id from req.user
        const order_id = result.lastInsertRowid;
        console.log(`Order inserted with order_id: ${order_id}`);

        // Save order items in the OrderItems table
        console.log('Inserting items into OrderItems table');
        const insertOrderItem = db.prepare(`
            INSERT INTO OrderItems (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)
        `);
        cartItems.forEach((item) => {
            insertOrderItem.run(order_id, item.product_id, item.quantity, item.price);
        });

        // Clear the cart
        console.log(`Clearing cart with cart_id: ${cart_id}`);
        db.prepare(`DELETE FROM CartProducts WHERE cart_id = ?`).run(cart_id);

        res.status(200).json({ message: 'Checkout successful', order_id });
    } catch (error) {
        console.error('Error during checkout:', error);
        res.status(500).json({ error: 'Failed to complete checkout' });
    }
};

module.exports = {
    addToCart,
    viewCart,
    getCart,
    checkout,
};