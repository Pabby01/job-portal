// middleware/authMiddleware.js
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import asyncHandler from 'express-async-handler'; // Helps in handling exceptions inside of async express routes and passing them to your express error handlers

// Middleware to protect routes
const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Extract token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the token (do not include password)
      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      console.error('Not authorized, token failed', error);
      res.status(401).json({ message: 'Not authorized, token failed' });
      return;
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
});

// Middleware to check if the user is an admin
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).json({ message: 'Not authorized as an admin' });
  }
};

const employer = (req, res, next) => {
  if (req.user && req.user.role === 'employer') {
    next();
  } else {
    res.status(401).json({ message: 'Not authorized as an employer' });
  }
};

export { protect, admin, employer };
