import express from 'express';
import User from '../models/userModel.js'; // Import our new User model
import generateToken from '../utils/generateToken.js'; // Import our token generator

const router = express.Router();

/**
 * @route   POST /api/users/register
 * @desc    Register a new user
 */
router.post('/register', async (req, res) => {
  // 1. Get the data from the request body
  const { name, email, password } = req.body;

  try {
    // 2. Check if a user with this email already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }

    // 3. Create the new user in the database
    // Our 'pre-save' hook in the model will AUTOMATICALLY hash the password!
    const user = await User.create({
      name,
      email,
      password,
      // We can't let a user make themselves an admin during registration
    });

    if (user) {
      // 4. Generate a token and set it as a cookie
      generateToken(res, user._id);

      // 5. Send back the user's data (without the password)
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: `Server Error: ${error.message}` });
  }
});

// ... (your '/register' route is above this)

/**
 * @route   POST /api/users/login
 * @desc    Authenticate user & get token (login)
 */
router.post('/login', async (req, res) => {
  // 1. Get email and password from the body
  const { email, password } = req.body;

  try {
    // 2. Find the user by their email
    const user = await User.findOne({ email });

    // 3. Check if user exists AND if passwords match
    // We use the new 'matchPassword' function we just wrote!
    if (user && (await user.matchPassword(password))) {
      // 4. IT'S A MATCH! Generate a token
      generateToken(res, user._id);

      // 5. Send back their data (safe to send, no password)
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      });
    } else {
      // If user not found or password doesn't match
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: `Server Error: ${error.message}` });
  }
});

// ... (the 'export default router;' is below this)

export default router;