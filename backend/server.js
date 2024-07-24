// Load environment variables from .env file
require('dotenv').config();

// Import the connectDB function
const connectDB = require('./config/db');
// Import express to set up the server
const express = require('express');
// Import CORS to handle cross-origin requests
const cors = require('cors');
// Import morgan for logging (optional)
const morgan = require('morgan');

// Create an express application
const app = express();

// Connect to MongoDB
connectDB();

// Use morgan for logging (optional, but recommended for development)
app.use(morgan('dev'));

// Configure CORS
app.use(cors({
  origin: 'http://localhost:3000', // Adjust if frontend runs on a different port or domain
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
}));

// Middleware to parse JSON request bodies
app.use(express.json());

// Import and use the authentication routes
app.use('/api/auth', require('./routes/authRoutes'));
// Import and use the user routes
app.use('/api/users', require('./routes/userRoutes'));
// Import and use the team routes
app.use('/api/teams', require('./routes/teamRoutes'));

// Define the port to run the server on
const PORT = process.env.PORT || 5001;

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Global error handler (optional)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: 'Something went wrong!' });
});
