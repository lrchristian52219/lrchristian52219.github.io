document.addEventListener('DOMContentLoaded', async () => {
    const cartItemsContainer = document.getElementById('cart-items');
    const checkoutButton = document.getElementById('checkout-button');

    async function getCartId() {
        try {
            const response = await fetch('/api/user/cart');
            if (!response.ok) {
                throw new Error(`Failed to fetch cart ID: ${response.status}`);
            }
            const data = await response.json();
            return data.cart_id;
        } catch (error) {
            console.error('Error fetching cart ID:', error);
            return null;
        }
    }

    async function loadCart() {
        try {
            const cartId = await getCartId();
            if (!cartId) {
                cartItemsContainer.innerHTML = '<p>Failed to load cart. Please try again later.</p>';
                updateCartSummary(0, 0, 5.0, 2.0, 0); // Default values for an empty cart
                return;
            }

            const response = await fetch(`/api/cart/${cartId}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const cartItems = await response.json();

            if (cartItems.length === 0) {
                cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
                updateCartSummary(0, 0, 5.0, 2.0, 0); // Default values for an empty cart
                return;
            }

            const cartHtml = cartItems
                .map(
                    (item) => `
                <div class="cart-item">
                    <img src="images/products/${item.product_id}.jpg" alt="${item.name}" class="cart-item-image" onerror="this.src='images/placeholder.jpg';">
                    <div class="cart-item-details">
                        <h3>${item.name}</h3>
                        <p>Price: $${item.price.toFixed(2)}</p>
                        <p>Quantity: ${item.quantity}</p>
                        <p>Total: $${(item.quantity * item.price).toFixed(2)}</p>
                    </div>
                </div>
            `
                )
                .join('');

            cartItemsContainer.innerHTML = cartHtml;

            // Calculate and update the cart summary
            const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
            const tax = subtotal * 0.0675; // 6.75% tax
            const deliveryFee = 5.0;
            const serviceFee = 2.0;
            const total = subtotal + tax + deliveryFee + serviceFee;

            updateCartSummary(subtotal, tax, deliveryFee, serviceFee, total);
        } catch (error) {
            console.error('Failed to load cart:', error);
            cartItemsContainer.innerHTML = '<p>Failed to load cart. Please try again later.</p>';
            updateCartSummary(0, 0, 5.0, 2.0, 0); // Default values for an error
        }
    }

    function updateCartSummary(subtotal, tax, deliveryFee, serviceFee, total) {
        console.log('Updating cart summary:', { subtotal, tax, deliveryFee, serviceFee, total });

        // Ensure all values are numbers before calling toFixed
        document.getElementById('subtotal').textContent = (subtotal || 0).toFixed(2);
        document.getElementById('tax').textContent = (tax || 0).toFixed(2);
        document.getElementById('delivery-fee').textContent = (deliveryFee || 0).toFixed(2);
        document.getElementById('service-fee').textContent = (serviceFee || 0).toFixed(2);
        document.getElementById('total').textContent = (total || 0).toFixed(2);
    }

    // Add event listener for the checkout button
    if (checkoutButton) {
        checkoutButton.addEventListener('click', async () => {
            const cartId = await getCartId();
            if (!cartId) {
                alert('Failed to process checkout. Please try again later.');
                return;
            }

            try {
                const response = await fetch(`/api/cart/${cartId}/checkout`, {
                    method: 'POST', // Ensure this is a POST request
                });

                if (response.ok) {
                    const result = await response.json();
                    alert('Checkout successful!');
                    window.location.reload(); // Reload the page or redirect to a confirmation page
                } else {
                    const error = await response.json();
                    alert(`Checkout failed: ${error.error}`);
                }
            } catch (error) {
                console.error('Error during checkout:', error);
                alert('An error occurred during checkout. Please try again later.');
            }
        });
    }

    loadCart();
});