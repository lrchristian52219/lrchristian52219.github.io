const db = require('../database/db'); // Assuming you have a database connection module

// Add a new product
const addProduct = ({ name, description, image_url, price, category_id, is_featured }) => {
    const query = `
        INSERT INTO products (name, description, image_url, price, category_id, is_featured)
        VALUES (?, ?, ?, ?, ?, ?)
    `;
    db.prepare(query).run(name, description, image_url, price, category_id, is_featured);
};

// Edit an existing product
const editProduct = (id, { name, description, image_url, price, category_id, is_featured }) => {
    const query = `
        UPDATE products
        SET name = ?, description = ?, image_url = ?, price = ?, category_id = ?, is_featured = ?
        WHERE id = ?
    `;
    db.prepare(query).run(name, description, image_url, price, category_id, is_featured, id);
};

// Delete a product
const deleteProduct = (id) => {
    const query = `DELETE FROM products WHERE id = ?`;
    db.prepare(query).run(id);
};

// Bulk upload products with validation
const bulkUploadProducts = (products) => {
    const query = `
        INSERT INTO Products (name, description, image_url, price, category_id, is_featured)
        VALUES (?, ?, ?, ?, ?, ?)
        ON CONFLICT(name) DO UPDATE SET
            description = excluded.description,
            image_url = excluded.image_url,
            price = excluded.price,
            category_id = excluded.category_id,
            is_featured = excluded.is_featured
    `;
    const stmt = db.prepare(query);

    products.forEach(product => {
        stmt.run(
            product.name,
            product.description,
            product.image_url,
            product.price,
            product.category_id,
            product.is_featured
        );
    });
};

// Get all categories
const getAllCategories = () => {
    const query = `SELECT * FROM categories`;
    return db.prepare(query).all();
};

// Add a new category
const addCategory = ({ name, priority_level }) => {
    const query = `
        INSERT INTO categories (name, priority_level)
        VALUES (?, ?)
    `;
    db.prepare(query).run(name, priority_level);
};

// Edit an existing category
const editCategory = (id, { name, priority_level }) => {
    const query = `
        UPDATE categories
        SET name = ?, priority_level = ?
        WHERE id = ?
    `;
    db.prepare(query).run(name, priority_level, id);
};

// Delete a category
const deleteCategory = (id) => {
    const query = `DELETE FROM categories WHERE id = ?`;
    db.prepare(query).run(id);
};

module.exports = {
    addProduct,
    editProduct,
    deleteProduct,
    bulkUploadProducts,
    getAllCategories,
    addCategory,
    editCategory,
    deleteCategory,
};