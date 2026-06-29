// routes/historyRoutes.js
const express = require('express');
const router = express.Router();
const historyController = require('../controllers/historyController');
const authMiddleware = require('../middlewares/authMiddleware');

// Endpoint: GET /api/history
router.get('/', authMiddleware, historyController.getUserHistory);

module.exports = router;