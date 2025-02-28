document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('product_id');

    if (productId) {
        // Fetch product details from the server or a local data source
        // For demonstration, we'll use a static example
        const productData = {
            "12345": {
                "product_name": "Sample Product",
                "product_price": "100.00",
                "product_quantity": "10",
                "product_image": "images/sample.jpg",
                "product_description": "This is a sample product description.",
                "category_id": "1"
            }
            // Add more products as needed
        };

        const product = productData[productId];
        if (product) {
            document.getElementById('product-id').value = productId;
            document.getElementById('product-name').value = product.product_name;
            document.getElementById('product-price').value = product.product_price;
            document.getElementById('product-quantity').value = product.product_quantity;
            document.getElementById('product-image').value = product.product_image;
            document.getElementById('product-description').value = product.product_description;
            document.getElementById('category-id').value = product.category_id;
        }
    }
});