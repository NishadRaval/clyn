import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

// This is our "security guard"
const protect = async (req, res, next) => {
  let token;

  // 1. Read the 'jwt' cookie from the request
  token = req.cookies.jwt;

  if (token) {
    try {
      // 2. Verify the token is real
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 3. Find the user from the token's ID
      // We attach the user to the 'req' object so our routes can access it
      req.user = await User.findById(decoded.userId).select('-password');

      next(); // All good! Go to the next step (the actual order route)
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    // 4. No token found
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

// We'll also make a guard for Admins
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).json({ message: 'Not authorized as an admin' });
  }
};

export { protect, admin };