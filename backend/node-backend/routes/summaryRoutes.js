// routes/summaryRoutes.js
const express = require('express');
const router = express.Router();
const summaryController = require('../controllers/summaryController');
const authMiddleware = require('../middlewares/authMiddleware');
const { validateBody } = require('../middlewares/validateMiddleware');

// Endpoint: POST /api/summarize
// Alur: Cek JWT -> Validasi Input -> Eksekusi Controller
router.post(
  '/', 
  authMiddleware, 
  validateBody(['text_origin', 'id_model']), 
  summaryController.createSummary
);

module.exports = router;