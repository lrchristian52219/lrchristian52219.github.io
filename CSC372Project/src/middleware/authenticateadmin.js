const authenticateAdmin = (req, res, next) => {
    // Example: Simulate admin authentication
    const isAdmin = true; // Replace with actual admin authentication logic
    if (!isAdmin) {
        return res.status(403).json({ error: 'Access denied. Admins only.' });
    }
    next();
};

module.exports = authenticateAdmin;