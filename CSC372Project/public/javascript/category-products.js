document.addEventListener('DOMContentLoaded', async () => {
    const categoryNameElement = document.getElementById('category-name');
    const productsContainer = document.getElementById('products-container');

    // Get the category ID from the URL query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const categoryId = urlParams.get('category_id');

    if (!categoryId) {
        categoryNameElement.textContent = 'Category Not Found';
        productsContainer.innerHTML = '<p>No category ID provided in the URL.</p>';
        return;
    }

    try {
        // Fetch category details and products from the backend
        const response = await fetch(`/api/categories/${categoryId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch category details');
        }

        const categoryData = await response.json();

        // Display the category name
        categoryNameElement.textContent = categoryData.name;

        // Display the products in this category
        if (categoryData.products && categoryData.products.length > 0) {
            categoryData.products.forEach((product) => {
                const productCard = document.createElement('div');
                productCard.classList.add('product-box');
                productCard.innerHTML = `
                    <img src="${product.image_url}" alt="${product.name}" class="product-image">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <p class="price">$${product.price.toFixed(2)}</p>
                    <button onclick="window.location.href='details.html?id=${product.id}'">View Details</button>
                `;
                productsContainer.appendChild(productCard);
            });
        } else {
            productsContainer.innerHTML = '<p>No products found in this category.</p>';
        }
    } catch (error) {
        console.error('Error loading category details:', error);
        categoryNameElement.textContent = 'Error Loading Category';
        productsContainer.innerHTML = '<p>Failed to load category details. Please try again later.</p>';
    }
});