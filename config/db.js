const mongoose = require('mongoose');
const MONGO_URI = process.env.MONGO_URI
// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
    });

module.exports = mongoose;