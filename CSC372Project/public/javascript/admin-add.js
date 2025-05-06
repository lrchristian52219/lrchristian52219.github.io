document.getElementById('add-product-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const newProduct = {
        name: document.getElementById('product-name').value,
        description: document.getElementById('product-description').value,
        price: parseFloat(document.getElementById('product-price').value),
        stock: parseInt(document.getElementById('product-stock').value, 10),
        category_id: parseInt(document.getElementById('product-category').value, 10),
        image_url: document.getElementById('product-image').value,
    };

    try {
        const response = await fetch('/api/admin/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newProduct),
        });

        if (!response.ok) {
            throw new Error(`Failed to add product: ${response.statusText}`);
        }

        alert('Product added successfully!');
        window.location.href = 'admin-products.html';
    } catch (error) {
        console.error('Failed to add product:', error);
        alert('Failed to add product.');
    }
});