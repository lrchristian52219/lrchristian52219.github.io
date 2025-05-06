const app = require('./app'); // Import the app instance
const PORT = 3000; // Define the port number

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});