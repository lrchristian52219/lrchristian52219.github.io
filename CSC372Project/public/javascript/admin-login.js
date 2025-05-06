document.getElementById('login-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const loginStatus = document.getElementById('login-status');

    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        if (response.ok) {
            const user = await response.json();

            if (user.role === 'admin') {
                localStorage.setItem('user', JSON.stringify(user)); // Store user info in localStorage
                loginStatus.textContent = 'Login successful!';
                window.location.href = 'admin-products.html'; // Redirect to admin dashboard
            } else {
                loginStatus.textContent = 'Access denied. Admins only.';
            }
        } else {
            const error = await response.json();
            loginStatus.textContent = `Error: ${error.message}`;
        }
    } catch (error) {
        console.error('Login failed:', error);
        loginStatus.textContent = 'Login failed. Please try again.';
    }
});