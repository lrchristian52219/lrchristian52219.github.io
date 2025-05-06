const loadProducts = async () => {
    try {
        const response = await fetch('/api/admin/products');
        if (!response.ok) {
            throw new Error(`Failed to fetch products: ${response.statusText}`);
        }

        const products = await response.json();
        console.log('Fetched products:', products); // Debugging log

        if (!Array.isArray(products)) {
            throw new TypeError('Expected an array of products');
        }

        const productTableBody = document.getElementById('product-table-body');
        productTableBody.innerHTML = ''; // Clear existing rows

        products.forEach((product) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${product.name}</td>
                <td>${product.description}</td>
                <td>$${product.price.toFixed(2)}</td>
                <td>${product.stock}</td>
                <td>
                    <button class="edit-button" data-id="${product.id}">Edit</button>
                    <button class="delete-button" data-id="${product.id}">Delete</button>
                </td>
            `;

            productTableBody.appendChild(row);
        });

        // Add event listeners for edit and delete buttons
        document.querySelectorAll('.edit-button').forEach((button) => {
            button.addEventListener('click', (event) => {
                const productId = event.target.getAttribute('data-id');
                window.location.href = `admin-edit.html?id=${productId}`; // Updated file name
            });
        });

        document.querySelectorAll('.delete-button').forEach((button) => {
            button.addEventListener('click', (event) => {
                const productId = event.target.getAttribute('data-id');
                deleteProduct(productId);
            });
        });
    } catch (error) {
        console.error('Failed to load products:', error);
    }
};

const editProduct = (productId) => {
    console.log(`Edit product with ID: ${productId}`);
    // Implement edit functionality here
};

const deleteProduct = async (productId) => {
    try {
        const response = await fetch(`/api/admin/products/${productId}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || `Failed to delete product: ${response.statusText}`);
        }

        alert('Product deleted successfully!');
        loadProducts(); // Reload the product list
    } catch (error) {
        console.error('Failed to delete product:', error);
        alert(error.message);
    }
};

// Load products on page load
document.addEventListener('DOMContentLoaded', () => {
    // Redirect to admin-add.html when the "Add New Product" button is clicked
    const addProductButton = document.getElementById('add-product-button');
    addProductButton.addEventListener('click', () => {
        window.location.href = 'admin-add.html';
    });

    // Load products when the page loads
    loadProducts();
});