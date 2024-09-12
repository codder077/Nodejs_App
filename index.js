require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const crudRoutes = require('./routes/crudRoutes');

const app = express();
app.use(express.json());

// Database connection
connectDB();

// Routes
app.use('/auth', authRoutes);
app.use('/api', crudRoutes);

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app; // Export the app instance
