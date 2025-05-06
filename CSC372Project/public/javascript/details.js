document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (!productId) {
        console.error('Product ID not found in URL');
        return;
    }

    try {
        // Fetch product details from the API
        const response = await fetch(`/api/products/${productId}`);
        const product = await response.json();

        // Update the product details on the page
        document.getElementById('product-image').src = product.image_url || 'images/placeholder.jpg';
        document.getElementById('product-name').textContent = product.name;
        document.getElementById('product-price').textContent = `$${product.price.toFixed(2)}`;
        document.getElementById('product-description').textContent = product.description;

        const featuresList = document.getElementById('product-features');
        if (product.features) {
            product.features.forEach(feature => {
                const li = document.createElement('li');
                li.textContent = feature;
                featuresList.appendChild(li);
            });
        }

        // Add to cart functionality
        const addToCartButton = document.getElementById('add-to-cart');
        if (addToCartButton) {
            addToCartButton.addEventListener('click', async () => {
                console.log('Add to Cart button clicked');

                try {
                    // Fetch the user's cart ID
                    const cartIdResponse = await fetch('/api/user/cart');
                    if (!cartIdResponse.ok) {
                        throw new Error('Failed to fetch cart ID');
                    }
                    const cartData = await cartIdResponse.json();
                    const cartId = cartData.cart_id;

                    // Add the product to the cart
                    const response = await fetch('/api/cart', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            cart_id: cartId,
                            product_id: productId,
                            quantity: 1, // Default quantity
                        }),
                    });

                    if (response.ok) {
                        alert('Product added to cart successfully!');
                    } else {
                        const error = await response.json();
                        console.error('Failed to add product to cart:', error);
                        alert('Failed to add product to cart.');
                    }
                } catch (error) {
                    console.error('Error adding product to cart:', error);
                    alert('An error occurred while adding the product to the cart.');
                }
            });
        }
    } catch (error) {
        console.error('Failed to fetch product details:', error);
    }
});

// Helper function to extract product ID from the URL
function getProductIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id'); // Assumes the product ID is passed as a query parameter (e.g., `?id=123`)
}