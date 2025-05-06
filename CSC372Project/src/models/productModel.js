const db = require('../database/db'); // Assuming you have a database connection module

// Get all products (with optional category and search filters)
const getAllProducts = (category, search) => {
    let query = `SELECT * FROM Products WHERE 1=1`;
    const params = [];

    if (category) {
        query += ` AND category_id = ?`;
        params.push(category);
    }

    if (search) {
        query += ` AND (name LIKE ? OR description LIKE ?)`;
        params.push(`%${search}%`, `%${search}%`);
    }

    return db.prepare(query).all(...params);
};

// Get product details by ID
const getProductById = (id) => {
    const query = `SELECT * FROM Products WHERE id = ?`;
    return db.prepare(query).get(id);
};

// Fetch featured products
const getFeaturedProducts = () => {
    const query = `SELECT * FROM Products WHERE is_featured = 1`;
    console.log('Executing query:', query); // Log the query
    return db.prepare(query).all();
};

// Fetch products by category ID
const getProductsByCategory = (category_id) => {
    const query = `SELECT * FROM Products WHERE category_id = ?`;
    return db.prepare(query).all(category_id);
};

// Get or create a cart for the user
const getOrCreateCart = (user_id) => {
    const existingCartQuery = `
        SELECT id FROM Carts WHERE user_id = ? AND status = 'new'
    `;
    const existingCart = db.prepare(existingCartQuery).get(user_id);

    if (existingCart) {
        return existingCart.id;
    }

    const createCartQuery = `
        INSERT INTO Carts (user_id, status) VALUES (?, 'new')
    `;
    const result = db.prepare(createCartQuery).run(user_id);
    return result.lastInsertRowid;
};

// Add a product to the cart
const addToCart = (cart_id, product_id, quantity) => {
    const query = `
        INSERT INTO CartProducts (cart_id, product_id, quantity)
        VALUES (?, ?, ?)
        ON CONFLICT(cart_id, product_id) DO UPDATE SET quantity = quantity + excluded.quantity
    `;
    db.prepare(query).run(cart_id, product_id, quantity);
};

// Remove a product from the cart
const removeFromCart = (cart_id, product_id) => {
    const query = `DELETE FROM CartProducts WHERE cart_id = ? AND product_id = ?`;
    db.prepare(query).run(cart_id, product_id);
};

// View cart
const viewCart = (cart_id) => {
    const query = `
        SELECT cp.product_id, p.name, p.price, cp.quantity, (p.price * cp.quantity) AS total_price
        FROM CartProducts cp
        JOIN Products p ON cp.product_id = p.id
        WHERE cp.cart_id = ?
    `;
    return db.prepare(query).all(cart_id);
};

// Checkout (empty the cart)
const checkout = (cart_id) => {
    const query = `DELETE FROM CartProducts WHERE cart_id = ?`;
    db.prepare(query).run(cart_id);

    // Optionally, update the cart status to 'purchased'
    const updateCartStatusQuery = `
        UPDATE Carts SET status = 'purchased' WHERE id = ?
    `;
    db.prepare(updateCartStatusQuery).run(cart_id);
};

module.exports = {
    getAllProducts,
    getProductById,
    getFeaturedProducts,
    getProductsByCategory,
    getOrCreateCart,
    addToCart,
    removeFromCart,
    viewCart,
    checkout,
};