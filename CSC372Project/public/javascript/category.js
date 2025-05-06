document.addEventListener('DOMContentLoaded', async () => {
    const categoryNameElement = document.getElementById('category-name');
    const categoryContainer = document.getElementById('category-container');
    const categoriesContainer = document.getElementById('categories-container');

    // Debugging: Log the elements
    console.log('categoryNameElement:', categoryNameElement);
    console.log('categoryContainer:', categoryContainer);
    console.log('categoriesContainer:', categoriesContainer);

    // Check if the elements exist
    if (!categoryNameElement) {
        console.error('Element with id "category-name" not found.');
    }
    if (!categoryContainer) {
        console.error('Element with id "category-container" not found.');
    }
    if (!categoriesContainer) {
        console.error('Element with id "categories-container" not found.');
        return;
    }

    // Fetch all categories from the backend
    try {
        const response = await fetch('/api/categories');
        if (!response.ok) {
            throw new Error('Failed to fetch categories');
        }

        const categories = await response.json();
        console.log('Fetched categories:', categories);

        // Display categories in boxes
        categories.forEach((category) => {
            const categoryBox = document.createElement('div');
            categoryBox.classList.add('category-box');
            categoryBox.innerHTML = `
                <h3>${category.name}</h3>
                <button onclick="window.location.href='category-products.html?category_id=${category.id}'">View Products</button>
            `;
            categoriesContainer.appendChild(categoryBox);
        });
    } catch (error) {
        console.error('Error loading categories:', error);
        categoriesContainer.innerHTML = '<p>Failed to load categories. Please try again later.</p>';
    }

    // Fetch products for a specific category if category ID is provided
    const urlParams = new URLSearchParams(window.location.search);
    const categoryId = urlParams.get('id');

    if (categoryId) {
        try {
            const response = await fetch(`/api/categories/${categoryId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch category details');
            }

            const categoryData = await response.json();
            console.log('Fetched category data:', categoryData);

            // Display the category name
            categoryNameElement.textContent = categoryData.name;

            // Display the products in this category
            if (categoryData.products && categoryData.products.length > 0) {
                categoryData.products.forEach((product) => {
                    const productElement = document.createElement('div');
                    productElement.classList.add('product-item');
                    productElement.innerHTML = `
                        <h3>${product.name}</h3>
                        <p>${product.description}</p>
                        <p>Price: $${product.price.toFixed(2)}</p>
                        <button onclick="window.location.href='details.html?id=${product.id}'">View Details</button>
                    `;
                    categoryContainer.appendChild(productElement);
                });
            } else {
                categoryContainer.innerHTML = '<p>No products found in this category.</p>';
            }
        } catch (error) {
            console.error('Error loading category details:', error);
            categoryNameElement.textContent = 'Error Loading Category';
            categoryContainer.innerHTML = '<p>Failed to load category details. Please try again later.</p>';
        }
    }
});