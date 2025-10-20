import jwt from 'jsonwebtoken';

// This file exports one single function
const generateToken = (res, userId) => {
  // 1. Create the token
  // The token securely "signs" the user's ID.
  // We use our secret key from the .env file
  // It expires in 30 days.
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });

  // 2. Set the token as a secure, HTTP-only cookie
  // This is the professional way to send a token.
  // It prevents it from being stolen by scripts.
  res.cookie('jwt', token, {
    httpOnly: true, // Prevents client-side script access
    secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production
    sameSite: 'strict', // Prevents cross-site attacks
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in milliseconds
  });
};

export default generateToken;