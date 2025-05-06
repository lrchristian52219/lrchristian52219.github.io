document.addEventListener('DOMContentLoaded', async () => {
    const searchBar = document.getElementById('search-bar');
    const searchButton = document.getElementById('search-button');
    const signoutButton = document.getElementById('signout-button');

    const productsContainer = document.getElementById('products-container');
    if (!productsContainer) {
        console.error('Element with id "products-container" not found.');
        return;
    }

    // Check if elements exist
    if (!productsContainer) {
        console.error('Element with id "products-container" not found.');
        return;
    }
    if (!searchBar) {
        console.error('Element with id "search-bar" not found.');
    }
    if (!searchButton) {
        console.error('Element with id "search-button" not found.');
    }
    if (!signoutButton) {
        console.error('Element with id "signout-button" not found.');
    }

    // Function to load products
    async function loadProducts(searchTerm = '') {
        try {
            const response = await fetch(`/api/products?search=${encodeURIComponent(searchTerm)}`);
            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }

            const products = await response.json();
            productsContainer.innerHTML = ''; // Clear existing products

            if (products.length === 0) {
                productsContainer.innerHTML = '<p>No products found.</p>';
                return;
            }

            // Display products
            products.forEach((product) => {
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
        } catch (error) {
            console.error('Error loading products:', error);
            productsContainer.innerHTML = '<p>Failed to load products. Please try again later.</p>';
        }
    }

    // Load all products on page load
    loadProducts();

    // Add search functionality
    if (searchButton) {
        searchButton.addEventListener('click', () => {
            const searchTerm = searchBar.value.trim();
            loadProducts(searchTerm);
        });
    }

    // Allow pressing "Enter" in the search bar to trigger search
    if (searchBar) {
        searchBar.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                const searchTerm = searchBar.value.trim();
                loadProducts(searchTerm);
            }
        });
    }

    // Handle sign out
    if (signoutButton) {
        signoutButton.addEventListener('click', () => {
            localStorage.removeItem('user'); // Clear user session
            window.location.href = 'login.html'; // Redirect to login page
        });
    }
});

const getProducts = (req, res) => {
    const { category_id } = req.query;

    try {
        const products = category_id
            ? db.prepare('SELECT * FROM Products WHERE category_id = ?').all(category_id)
            : db.prepare('SELECT * FROM Products').all();

        res.status(200).json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
};

