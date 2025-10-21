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
      secure: true, // <-- EXPLICITLY SET TO TRUE (Requires HTTPS)
      sameSite: 'None', // <-- CHANGE FROM 'strict' TO 'None'
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });
};

export default generateToken;