// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { validateBody } = require('../middlewares/validateMiddleware');

// Endpoint: POST /api/auth/register
router.post('/register', validateBody(['nama', 'email', 'password']), authController.register);

// Endpoint: POST /api/auth/login
router.post('/login', validateBody(['email', 'password']), authController.login);

module.exports = router;