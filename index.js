// index.js
const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const PORT = 5100;

// Middleware
app.use(cors());
app.use(express.json());

// Sample endpoint
app.get('/', (req, res) => {
    res.json({ message: 'Hello from the backend!' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
