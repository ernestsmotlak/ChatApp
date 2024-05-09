const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors'); // Import the cors middleware

const app = express();
const port = 3010;

app.use(cors()); // Use cors middleware to enable CORS

// Connect to SQLite database
const db = new sqlite3.Database('War-database.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error('Error connecting to database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

app.get('/', (req, res) => {
    res.send('Welcome to the War Card Game API!');
});

app.use(bodyParser.json());
// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});