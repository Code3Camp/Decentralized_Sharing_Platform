const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cors = require('cors');

const app = express();
const PORT = 3001;
const SECRET_KEY = 'tRw5rP&@gTY!7h$e';

// Sample user database
const users = [];

//allow the client to communicate with the api
app.use(cors());

// Middleware
app.use(bodyParser.json());

// Signup endpoint
app.post('/signup', async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);
    // Check if email already exists
    if (users.some(user => user.email === email)) {
        return res.status(400).json({ message: 'email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Store user details
    users.push({ email, password: hashedPassword });

    res.status(201).json({ message: 'User created successfully' });
});

// Login endpoint
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Find user by email
    const user = users.find(user => user.email === email);

    // Check if user exists
    if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Check password
    if (await bcrypt.compare(password, user.password)) {
        // Generate JWT token
        const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: '1h' });

        return res.json({ token });
    } else {
        return res.status(401).json({ message: 'Invalid email or password' });
    }
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

        req.email = decoded.email;
        next();
    });
}

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
