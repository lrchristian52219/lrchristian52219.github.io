document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search');
    const searchButton = document.getElementById('search-button');
    const addProductButton = document.getElementById('add-product-button');
    const productItems = document.querySelectorAll('.product-item');
    const signoutButton = document.getElementById('signout-button');

    searchButton.addEventListener('click', () => {
        const searchTerm = searchInput.value.toLowerCase();
        productItems.forEach(item => {
            const productName = item.querySelector('.product-details h3').textContent.toLowerCase();
            const category = item.getAttribute('data-category').toLowerCase();
            if (productName.includes(searchTerm) || category.includes(searchTerm)) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
    });

    addProductButton.addEventListener('click', () => {
        window.location.href = 'product-edit.html';
    });

    productItems.forEach(item => {
        item.querySelector('.edit-product').addEventListener('click', () => {
            const productId = item.getAttribute('data-id');
            window.location.href = `product-edit.html?product_id=${productId}`;
        });

        item.querySelector('.delete-product').addEventListener('click', () => {
            item.remove();
        });

        item.querySelector('.archive-product').addEventListener('click', () => {
            item.style.display = 'none';
        });
    });

    signoutButton.addEventListener('click', () => {
        // Add sign-out functionality here
        alert('Signed out');
    });
});