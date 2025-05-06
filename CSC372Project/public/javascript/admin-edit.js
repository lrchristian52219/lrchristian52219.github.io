document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (!productId) {
        alert('No product ID provided.');
        window.location.href = 'admin-products.html';
        return;
    }

    try {
        const response = await fetch(`/api/admin/products/${productId}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch product: ${response.statusText}`);
        }

        const product = await response.json();
        console.log('Fetched product:', product); // Debugging log

        // Populate the form with product details
        document.getElementById('product-name').value = product.name;
        document.getElementById('product-description').value = product.description;
        document.getElementById('product-price').value = product.price;
        document.getElementById('product-stock').value = product.stock;
        document.getElementById('product-category').value = product.category_id;
        document.getElementById('product-image').value = product.image_url;
    } catch (error) {
        console.error('Failed to load product details:', error);
        alert('Failed to load product details.');
        window.location.href = 'admin-products.html';
    }
});

document.getElementById('edit-product-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const productId = new URLSearchParams(window.location.search).get('id');
    const updatedProduct = {
        name: document.getElementById('product-name').value,
        description: document.getElementById('product-description').value,
        price: parseFloat(document.getElementById('product-price').value),
        stock: parseInt(document.getElementById('product-stock').value, 10),
        category_id: parseInt(document.getElementById('product-category').value, 10),
        image_url: document.getElementById('product-image').value,
    };

    try {
        const response = await fetch(`/api/admin/products/${productId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedProduct),
        });

        if (!response.ok) {
            throw new Error(`Failed to update product: ${response.statusText}`);
        }

        alert('Product updated successfully!');
        window.location.href = 'admin-products.html';
    } catch (error) {
        console.error('Failed to update product:', error);
        alert('Failed to update product.');
    }
});