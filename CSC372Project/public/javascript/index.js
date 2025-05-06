document.addEventListener('DOMContentLoaded', async () => {
    const featuredGrid = document.getElementById('featured-grid');
    const signoutButton = document.getElementById('signout-button');

    // Fetch and display featured products
    async function loadFeaturedProducts() {
        try {
            const response = await fetch('/api/products/featured');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const products = await response.json();

            if (!Array.isArray(products)) {
                throw new Error('Invalid response format: Expected an array');
            }

            featuredGrid.innerHTML = ''; // Clear the grid

            if (products.length === 0) {
                featuredGrid.innerHTML = '<p>No featured products available at the moment.</p>';
                return;
            }

            products.slice(0, 3).forEach(product => {
                const productItem = document.createElement('div');
                productItem.className = 'featured-item';
                productItem.innerHTML = `
                    <img src="${product.image_url || 'images/placeholder.jpg'}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <a href="details.html?id=${product.id}" class="cta">Learn More</a>
                `;
                featuredGrid.appendChild(productItem);
            });
        } catch (error) {
            console.error('Failed to load featured products:', error);
            featuredGrid.innerHTML = '<p>Failed to load featured products. Please try again later.</p>';
        }
    }

    // Handle sign out
    signoutButton.addEventListener('click', () => {
        localStorage.removeItem('user'); // Clear user session
        window.location.href = 'login.html'; // Redirect to login page
    });

    // Load featured products on page load
    loadFeaturedProducts();
});