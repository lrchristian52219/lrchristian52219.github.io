const Database = require('better-sqlite3');
const path = require('path');

// Path to the new SQLite database file
const dbPath = path.join(__dirname, 'cyberHorizon.db');

// Initialize the database connection
const db = new Database(dbPath, { verbose: console.log });

module.exports = db;