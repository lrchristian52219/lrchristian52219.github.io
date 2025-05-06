const getUserCart = (req, res) => {
    try {
        console.log('Fetching cart ID for user:', req.user);
        const cart_id = req.user.cart_id; // Assuming `req.user` contains the authenticated user's data
        if (!cart_id) {
            console.log('Cart ID not found for user');
            return res.status(404).json({ error: 'Cart ID not found' });
        }
        console.log('Cart ID fetched:', cart_id);
        res.status(200).json({ cart_id });
    } catch (error) {
        console.error('Error fetching user cart:', error);
        res.status(500).json({ error: 'Failed to fetch user cart' });
    }
};

module.exports = {
    getUserCart,
};