const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors'); // Import the cors middleware

const app = express();
const port = 3010;

app.use(cors()); // Use cors middleware to enable CORS

app.use(bodyParser.json());

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

app.post('/register', (req, res) => {
    const { username, password, passwordAgain } = req.body;

    const checkIfUserExists = 'SELECT * FROM User WHERE Username = ?';

    db.get(checkIfUserExists, [username], (err, user) => {
        if (err) {
            console.error('Error checking for username:' + err.message);
            return res.status(500).json({ error: 'Internal server error.', registrationReturn: false });
        }

        if (user) {
            return res.status(400).json({ error: 'Username already exists, pick another username!', registrationReturn: false });
        }

        // If username doesn't exist, proceed with registration
        if (password === passwordAgain) {
            const insertIntoUser = 'INSERT INTO User (Username, Password) VALUES (?, ?)';

            db.run(insertIntoUser, [username, password], (err) => {
                if (err) {
                    console.error('Error inserting username and password: ', err.message);
                    return res.status(500).json({ error: 'Internal server error!', registrationReturn: false });
                }

                res.json({ message: 'User ' + username + ' registered successfully!', registrationReturn: true });
            });
        } else {
            res.status(400).json({ error: 'Passwords do not match!', registrationReturn: false });
        }
    });
});


// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});