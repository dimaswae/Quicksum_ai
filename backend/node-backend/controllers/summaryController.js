// controllers/summaryController.js
const { Text, Summary, History, AI_Model } = require('../models/Index');
// const aiService = require('../services/aiService'); // Akan di-uncomment saat service AI sudah dibuat
const { successResponse, errorResponse } = require('../utils/responseHandler');
const { logError } = require('../utils/logger');
// 1. IMPORT OBJECT DB (Wajib ada di paling atas!)
const db = require('../models/Index'); 

// 2. IMPORT SERVICE AI
const aiService = require('../services/aiService');

exports.createSummary = async (req, res) => {
  try {
    const startTime = Date.now();

    const { text_origin, id_model } = req.body;
    const id_user = req.user.id_user; 

    if (!text_origin || !id_model) {
      return res.status(400).json({ status: 'error', message: 'Teks dan ID Model wajib diisi.' });
    }

    // 1. Validasi keberadaan Model AI
    const model = await db.AI_Model.findByPk(id_model);
    if (!model) {
      return res.status(404).json({ status: 'error', message: 'Model AI tidak ditemukan.' });
    }

    // 2. Simpan Teks Asli ke Database
    const newText = await Text.create({ id_user, text_origin });

  // 2. Panggil service AI (FastAPI)
    const hasilAi = await aiService.generateSummary(text_origin, model.model_name);
    const endTime = Date.now();
    const processingTimeMs = `${endTime - startTime}ms`;

    // 4. Simpan Hasil Ringkasan
    const newSummary = await Summary.create({
      id_text: newText.id_text,
      id_model: id_model,
      summary_text: hasilAi,
      processing_time: processingTimeMs
    });

    // 5. Catat Log ke History
    await History.create({
      id_user,
      id_text: newText.id_text,
      id_summary: newSummary.id_summary,
      id_model: id_model,
      action: 'CREATE_SUMMARY',
      history_name: `Summary created using ${model.model_name}`
    });

    res.status(201).json({
      status: 'success',
      message: 'Ringkasan berhasil dibuat.',
      data: newSummary
    });
  } catch (error) {
    logError('Summary Error', error);
    errorResponse(res, 500, 'Gagal memproses ringkasan.');
  }
};
