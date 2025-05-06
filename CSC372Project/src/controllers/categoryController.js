const db = require('../database/db');

// Fetch details for a specific category, including its products
const getCategoryDetails = (req, res) => {
    const { id } = req.params;

    try {
        const category = db.prepare('SELECT id, name FROM Categories WHERE id = ?').get(id);
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }

        const products = db.prepare(`
            SELECT id, name, description, price, 
                   CASE 
                       WHEN image_url IS NOT NULL AND image_url != '' AND image_url NOT LIKE 'images/%' THEN 'images/products/' || image_url
                       WHEN image_url IS NOT NULL AND image_url != '' THEN image_url
                       ELSE 'images/placeholder.jpg'
                   END AS image_url
            FROM Products 
            WHERE category_id = ?
        `).all(id);

        res.status(200).json({ ...category, products });
    } catch (error) {
        console.error('Error fetching category details:', error);
        res.status(500).json({ error: 'Failed to fetch category details' });
    }
};

// Fetch all categories
const getAllCategories = (req, res) => {
    try {
        const categories = db.prepare('SELECT id, name FROM Categories').all();
        res.status(200).json(categories);
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ error: 'Failed to fetch categories' });
    }
};

module.exports = { getCategoryDetails, getAllCategories };