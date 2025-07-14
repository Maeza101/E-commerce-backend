// index.js
const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
require('./config/db'); // Ensure this file exists and connects to MongoDB
const productRouter = require('./router/product.router');
const PORT = 5100;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/api/products', productRouter);
// Sample endpoint
app.get('/', (req, res) => {
    res.json({ message: 'Hello from the backend!' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
