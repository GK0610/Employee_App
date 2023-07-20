// server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const { authMiddleware, errorHandler } = require('./src/config/middlewares');
const employeeRoutes = require('./src/routes/employees');

// Load environment variables from .env file
dotenv.config();

// Create an instance of Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/employees', employeeRoutes);

// Error handling middleware
app.use(errorHandler);

// Connect to MongoDB database
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
    // Start the server
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
