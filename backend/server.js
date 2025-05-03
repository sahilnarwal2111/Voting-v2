const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

// Initialize express app
const app = express();

// Middleware
app.use(express.json());
// app.use(cors());
app.use(cors({
  origin: '*', // Allow all origins
  methods: 'GET,POST,PUT,DELETE', // Allow specific methods
}));


// Define routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/polls', require('./routes/polls'));
app.use('/api/votes', require('./routes/votes'));

// Base route
app.get('/', (req, res) => {
  res.send('Voting API is running');
});

// Error handler middleware (should be last)
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, '0.0.0.0',() => {
  console.log(`Server running on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});