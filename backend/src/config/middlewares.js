const jwt = require('jsonwebtoken');

// Middleware for handling authentication
const authMiddleware = (req, res, next) => {
  // Get the token from the request headers
  const token = req.headers.authorization;

  // Check if token exists
  if (!token) {
    return res.status(401).json({ message: 'Authorization token not found' });
  }

  try {
    // Verify and decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the user information to the request object
    req.user = decoded;

    // Proceed to the next middleware
    next();
  } catch (error) {
    console.error('Error verifying token:', error);
    return res.status(401).json({ message: 'Invalid token' });
  }
};

// Middleware for handling authorization
const adminMiddleware = (req, res, next) => {
  // Check if user is an admin
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Unauthorized access' });
  }

  // Proceed to the next middleware
  next();
};

// Error handling middleware
const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ message: 'Internal server error' });
};

module.exports = { authMiddleware, adminMiddleware, errorHandler };
