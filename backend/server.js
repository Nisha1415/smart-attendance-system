// Import required packages
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/attendanceDB')
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.log('MongoDB connection error:', err));

// Test route
app.get('/', (req, res) => {
  res.send('Smart Attendance Backend is Running');
});

// Auth routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/attendance', require('./routes/attendance'));

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
