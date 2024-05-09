const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors'); // Import the cors middleware

const app = express();
const port = 3000;

app.use(cors()); // Use cors middleware to enable CORS

// Connect to SQLite database
const db = new sqlite3.Database('sqlDataBase/Baza.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error('Error connecting to database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

app.use(bodyParser.json());
// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});