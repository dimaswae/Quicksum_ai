// routes/index.js
const express = require('express');
const router = express.Router();

// Import semua rute spesifik
const authRoutes = require('./authRoutes');
const summaryRoutes = require('./summaryRoutes');
const historyRoutes = require('./historyRoutes');
const modelRoutes = require('./modelRoutes');

// Daftarkan prefix (awalan URL) untuk masing-masing rute
router.use('/auth', authRoutes);         // Endpoint: /api/auth/...
router.use('/summarize', summaryRoutes); // Endpoint: /api/summarize/...
router.use('/history', historyRoutes);   // Endpoint: /api/history/...
router.use('/models', modelRoutes);      // Endpoint: /api/models/...

module.exports = router;