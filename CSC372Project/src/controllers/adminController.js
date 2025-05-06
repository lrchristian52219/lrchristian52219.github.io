const db = require('../database/db');

// Add a new product
const addProduct = (req, res) => {
    const { name, description, price, category_id, image_url, stock } = req.body;

    if (!name || !price || !category_id) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        db.prepare(`
            INSERT INTO Products (name, description, price, category_id, image_url, stock)
            VALUES (?, ?, ?, ?, ?, ?)
        `).run(name, description, price, category_id, image_url, stock);

        res.status(201).json({ message: 'Product added successfully' });
    } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).json({ error: 'Failed to add product' });
    }
};

// Edit an existing product
const editProduct = (req, res) => {
    const { id } = req.params;
    const { name, description, price, category_id, image_url, stock } = req.body;

    try {
        db.prepare(`
            UPDATE Products
            SET name = ?, description = ?, price = ?, category_id = ?, image_url = ?, stock = ?
            WHERE id = ?
        `).run(name, description, price, category_id, image_url, stock, id);

        res.status(200).json({ message: 'Product updated successfully' });
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ error: 'Failed to update product' });
    }
};

// Delete a product
const deleteProduct = (req, res) => {
    const { id } = req.params;

    try {
        // Delete the product from the Products table
        const result = db.prepare('DELETE FROM Products WHERE id = ?').run(id);

        if (result.changes === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ error: 'Failed to delete product' });
    }
};

// Bulk upload products
const bulkUploadProducts = (req, res) => {
    const products = req.body;

    if (!Array.isArray(products)) {
        console.error('Invalid JSON format: Expected an array of products.');
        return res.status(400).json({ error: 'Invalid JSON format. Expected an array of products.' });
    }

    try {
        const insert = db.prepare(`
            INSERT INTO Products (id, name, description, price, category_id, image_url, stock)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `);

        products.forEach((product) => {
            const { id, name, description, price, category_id, image_url, stock } = product;

            // Log each product for debugging
            console.log('Processing product:', product);

            if (!name || !price || !category_id) {
                console.error('Missing required fields for product:', product);
                throw new Error('Missing required fields');
            }

            insert.run(id, name, description, price, category_id, image_url, stock);
        });

        res.status(200).json({ message: 'Products uploaded successfully' });
    } catch (error) {
        console.error('Error uploading products:', error);
        res.status(500).json({ error: 'Failed to upload products' });
    }
};

// Get all products
const getAllProducts = (req, res) => {
    try {
        const products = db.prepare('SELECT * FROM Products').all();
        res.status(200).json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
};

// Get product by ID
const getProductById = (req, res) => {
    const { id } = req.params;

    try {
        const product = db.prepare('SELECT * FROM Products WHERE id = ?').get(id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.status(200).json(product);
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ error: 'Failed to fetch product' });
    }
};

// Get all categories
const getAllCategories = (req, res) => {
    try {
        const categories = db.prepare('SELECT * FROM Categories').all();
        res.status(200).json(categories);
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ error: 'Failed to fetch categories' });
    }
};

// Add a new category
const addCategory = (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ error: 'Category name is required' });
    }

    try {
        db.prepare('INSERT INTO Categories (name) VALUES (?)').run(name);
        res.status(201).json({ message: 'Category added successfully' });
    } catch (error) {
        console.error('Error adding category:', error);
        res.status(500).json({ error: 'Failed to add category' });
    }
};

// Edit an existing category
const editCategory = (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    try {
        db.prepare('UPDATE Categories SET name = ? WHERE id = ?').run(name, id);
        res.status(200).json({ message: 'Category updated successfully' });
    } catch (error) {
        console.error('Error updating category:', error);
        res.status(500).json({ error: 'Failed to update category' });
    }
};

// Delete a category
const deleteCategory = (req, res) => {
    const { id } = req.params;

    try {
        db.prepare('DELETE FROM Categories WHERE id = ?').run(id);
        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
        console.error('Error deleting category:', error);
        res.status(500).json({ error: 'Failed to delete category' });
    }
};

// Get all orders
const getAllOrders = (req, res) => {
    try {
        const orders = db.prepare('SELECT * FROM Orders').all();
        res.status(200).json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ error: 'Failed to fetch orders' });
    }
};

// Get order details
const getOrderDetails = (req, res) => {
    const { id } = req.params;

    try {
        const order = db.prepare('SELECT * FROM Orders WHERE id = ?').get(id);
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        res.status(200).json(order);
    } catch (error) {
        console.error('Error fetching order details:', error);
        res.status(500).json({ error: 'Failed to fetch order details' });
    }
};

module.exports = {
    addProduct,
    editProduct,
    deleteProduct,
    bulkUploadProducts,
    getAllProducts,
    getProductById,
    getAllCategories,
    addCategory,
    editCategory,
    deleteCategory,
    getAllOrders,
    getOrderDetails
};