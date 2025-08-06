const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { registerSchema, loginSchema } = require('../validators/userValidator');
const validate = require('../middleware/validationMiddleware');
const { authenticateToken } = require('../middleware/authMiddleware');

// Public routes
router.post('/register', validate(registerSchema), userController.register);
router.post('/login', validate(loginSchema), userController.login);

// Protected route
router.get('/profile', authenticateToken, userController.getProfile);

module.exports = router;
