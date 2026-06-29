// routes/modelRoutes.js
const express = require('express');
const router = express.Router();
const modelController = require('../controllers/modelController');
const authMiddleware = require('../middlewares/authMiddleware');

// Endpoint: GET /api/models
// Kita lindungi dengan authMiddleware agar hanya user terdaftar yang bisa melihat list model
router.get('/', authMiddleware, modelController.getAllModels);

module.exports = router;