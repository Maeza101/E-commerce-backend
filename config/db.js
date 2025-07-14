const mongoose = require('mongoose');
const MONGO_URI = process.env.MONGO_URI

if (!MONGO_URI) {
    console.error('❌ MONGO_URI not found in environment variables.');
    process.exit(1);
}

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch(err => {
        console.error('❌ MongoDB connection error:', err);
        process.exit(1); // Optional: Exit if DB connection fails
    });

module.exports = mongoose;