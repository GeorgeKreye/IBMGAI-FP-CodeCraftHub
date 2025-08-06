/**
 * Middleware for validating request body against a Joi schema.
 *
 * @param {Object} schema - Joi validation schema
 * @returns {Function} Express middleware function
 */
module.exports = (schema) => {
    return (req, res, next) => {
      // Validate request body against the provided schema
      const { error } = schema.validate(req.body);
  
      if (error) {
        // If validation fails, respond with 400 and validation error message
        return res.status(400).json({ message: error.details[0].message });
      }
  
      // Proceed to next middleware/handler if validation passes
      next();
    };
  };
  