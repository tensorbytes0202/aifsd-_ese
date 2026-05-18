import jwt from 'jsonwebtoken';

/**
 * Generate JWT Token
 * @param {String} id - User ID
 * @returns {String} JWT Token
 */
export const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d',
  });
};
