const http = require('http');
const app = require('./src/app');

const PORT = process.env.PORT || 3000;

// Create the server
const server = http.createServer(app);

// Start the server
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});