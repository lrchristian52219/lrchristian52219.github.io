document.addEventListener('DOMContentLoaded', () => {
    const signoutButton = document.getElementById('signout-button');

    if (signoutButton) {
        signoutButton.addEventListener('click', () => {
            // Clear user session or token (example: localStorage)
            localStorage.removeItem('userToken'); // Adjust based on your authentication logic

            // Redirect to the login page
            window.location.href = 'login.html'; // Replace with your desired page
        });
    }

    const searchBar = document.getElementById('search-bar');
    const searchButton = document.getElementById('search-button');
    const searchResultsContainer = document.getElementById('search-results-container');

    if (!searchBar || !searchButton || !searchResultsContainer) {
        console.warn('Search elements not found. Skipping search functionality.');
    } else {
        // Perform search when the search button is clicked
        searchButton.addEventListener('click', async () => {
            const query = searchBar.value.trim();
            if (!query) {
                searchResultsContainer.innerHTML = '<p>Please enter a search term.</p>';
                searchResultsContainer.classList.add('active');
                return;
            }

            try {
                const response = await fetch(`/api/search?query=${encodeURIComponent(query)}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch search results');
                }

                const results = await response.json();
                searchResultsContainer.innerHTML = ''; // Clear previous results

                if (results.length === 0) {
                    searchResultsContainer.innerHTML = '<p>No results found.</p>';
                    searchResultsContainer.classList.add('active');
                    return;
                }

                // Display search results
                results.forEach((result) => {
                    const resultItem = document.createElement('div');
                    resultItem.classList.add('search-result-item');
                    resultItem.innerHTML = `
                        <h3>${result.name}</h3>
                        <p>${result.description || (result.type === 'category' ? 'Category' : '')}</p>
                    `;

                    // Add click event to redirect based on type
                    resultItem.addEventListener('click', () => {
                        if (result.type === 'product') {
                            window.location.href = `details.html?id=${result.id}`;
                        } else if (result.type === 'category') {
                            window.location.href = `category-products.html?category_id=${result.id}`;
                        }
                    });

                    searchResultsContainer.appendChild(resultItem);
                });

                searchResultsContainer.classList.add('active'); // Show the results
            } catch (error) {
                console.error('Error fetching search results:', error);
                searchResultsContainer.innerHTML = '<p>Failed to load search results. Please try again later.</p>';
                searchResultsContainer.classList.add('active');
            }
        });

        // Hide search results when clicking outside
        document.addEventListener('click', (event) => {
            if (!searchResultsContainer.contains(event.target) && !searchBar.contains(event.target) && !searchButton.contains(event.target)) {
                searchResultsContainer.classList.remove('active');
            }
        });
    }
});