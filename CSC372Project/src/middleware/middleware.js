const authenticateUser = (req, res, next) => {
    console.log('authenticateUser middleware called');
    req.user = {
        id: 1, // User ID
        cart_id: 1 // Cart ID
    };
    next();
};

module.exports = authenticateUser;