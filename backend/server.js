const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = 3001;
const SECRET_KEY = 'your_secret_key';
const DB_FILE_PATH = 'users.db';

// Initialize SQLite database
const db = new sqlite3.Database(DB_FILE_PATH);

// Create users table
db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, username TEXT UNIQUE, password TEXT)");
});

// Middleware
app.use(bodyParser.json());

// Signup endpoint
app.post('/signup', async (req, res) => {
    const { username, password } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into database
    db.run("INSERT INTO users (username, password) VALUES (?, ?)", [username, hashedPassword], function (err) {
        if (err) {
            return res.status(400).json({ message: 'Username already exists or invalid input' });
        }

        res.status(201).json({ message: 'User created successfully' });
    });
});

// Login endpoint
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // Find user by username
    db.get("SELECT * FROM users WHERE username = ?", [username], async (err, row) => {
        if (err) {
            return res.status(500).json({ message: 'Internal server error' });
        }

        if (!row) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Check password
        if (await bcrypt.compare(password, row.password)) {
            // Generate JWT token
            const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });

            return res.json({ token });
        } else {
            return res.status(401).json({ message: 'Invalid username or password' });
        }
    });
});

// Protected route
app.get('/protected', verifyToken, (req, res) => {
    res.json({ message: 'Protected route accessed successfully' });
});

// Verify JWT token
function verifyToken(req, res, next) {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ message: 'Token not provided' });
    }

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Failed to authenticate token' });
        }

        req.username = decoded.username;
        next();
    });
}

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
