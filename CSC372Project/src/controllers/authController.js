const db = require('../database/db');

const login = (req, res) => {
    const { username, password } = req.body;

    try {
        const query = `SELECT id, username, role FROM Users WHERE username = ? AND password = ?`;
        const user = db.prepare(query).get(username, password);

        if (user) {
            res.status(200).json(user); // Return user info (excluding password)
        } else {
            res.status(401).json({ message: 'Invalid username or password' });
        }
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { login };