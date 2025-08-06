/**
 * Validation schemas for user-related operations using Joi
 */
const Joi = require('joi');

// Schema for user registration validation
const registerSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(128).required(),
  role: Joi.string().valid('student', 'instructor', 'admin').optional(),
  preferences: Joi.object().optional()
});

// Schema for user login validation
const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

// Export validation schemas
module.exports = {
  registerSchema,
  loginSchema
};
s
