const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const adminRoutes = require('./routes/adminRoutes');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const userRoutes = require('./routes/userRoutes');
const searchController = require('./controllers/searchController');
const categoryRoutes = require('./routes/categoryRoutes');
const app = express();

// Middleware
app.use(bodyParser.json()); // Parse JSON request bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded request bodies
app.use(express.json()); // To parse JSON request bodies

// Redirect root URL to the login page
app.get('/', (req, res) => {
    res.redirect('/login.html');
});

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, '../public')));

// Routes
app.use('/api', productRoutes); // Product-related routes
app.use('/api/admin', adminRoutes); // Admin-related routes
app.use('/api', authRoutes); // Authentication-related routes
console.log('Registering /api routes');
app.use('/api', cartRoutes); // Ensure the `/api` prefix is used
app.use('/api', userRoutes); // User-related routes
app.use('/api/categories', categoryRoutes);
app.get('/api/search', searchController.search);


// Default route for handling 404 errors
app.use((req, res) => {
    console.log(`Route not found: ${req.method} ${req.url}`);
    res.status(404).json({ error: 'Route not found' });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;