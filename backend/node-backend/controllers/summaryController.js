// controllers/summaryController.js
const { errorResponse } = require('../utils/responseHandler');
const { logError } = require('../utils/logger');
const aiService = require('../services/aiService');

exports.createSummary = async (req, res) => {
  try {
    const { text, length } = req.body;

    if (!text || !length) {
      return res.status(400).json({ status: 'error', message: 'Teks dan panjang ringkasan wajib diisi.' });
    }

    const hasilAi = await aiService.generateSummary(text, length);

    return res.status(200).json({
      summary: hasilAi
    });
  } catch (error) {
    logError('Summary Error', error);
    return errorResponse(res, 500, 'Gagal memproses ringkasan.');
  }
};
