const db = require('../database/db');

const search = (req, res) => {
    const { query } = req.query;

    if (!query) {
        return res.status(400).json({ error: 'Search query is required' });
    }

    try {
        const results = db.prepare(`
            SELECT 'product' AS type, id, name, description 
            FROM Products 
            WHERE name LIKE ? OR description LIKE ?
            UNION
            SELECT 'category' AS type, id, name, NULL AS description 
            FROM Categories 
            WHERE name LIKE ?
        `).all(`%${query}%`, `%${query}%`, `%${query}%`);

        res.status(200).json(results);
    } catch (error) {
        console.error('Error performing search:', error);
        res.status(500).json({ error: 'Failed to perform search' });
    }
};

module.exports = { search };