// utils/generateToken.js
import jwt from 'jsonwebtoken';

/**
 * Generates a JWT token for a given user ID.
 * 
 * @param {string} id - The user ID to be embedded in the token.
 * @returns {string} A JWT string token.
 */
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d', // Sets the token to expire in 30 days
  });
};

export default generateToken;
