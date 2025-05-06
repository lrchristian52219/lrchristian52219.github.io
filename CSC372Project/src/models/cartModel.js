// Add a product to the cart
const addToCart = (cart_id, product_id, quantity) => {
    const query = `
        INSERT INTO CartProducts (cart_id, product_id, quantity)
        VALUES (?, ?, ?)
        ON CONFLICT(cart_id, product_id) DO UPDATE SET quantity = quantity + excluded.quantity
    `;
    db.prepare(query).run(cart_id, product_id, quantity);
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

// Checkout
const checkout = (cart_id) => {
    const query = `DELETE FROM CartProducts WHERE cart_id = ?`;
    db.prepare(query).run(cart_id);

    // Update cart status
    const updateCartStatusQuery = `
        UPDATE Carts SET status = 'purchased' WHERE id = ?
    `;
    db.prepare(updateCartStatusQuery).run(cart_id);
};