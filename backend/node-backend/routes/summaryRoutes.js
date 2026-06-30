// routes/summaryRoutes.js
const express = require('express');
const router = express.Router();
const summaryController = require('../controllers/summaryController');
const { validateBody } = require('../middlewares/validateMiddleware');

// Endpoint: POST /api/summarize
router.post(
  '/',
  validateBody(['text', 'length']),
  summaryController.createSummary
);

module.exports = router;