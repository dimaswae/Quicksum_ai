// controllers/historyController.js
const { History, Text, Summary, AI_Model } = require('../models/Index');
const { successResponse, errorResponse } = require('../utils/responseHandler');
const { logError } = require('../utils/logger');

exports.getUserHistory = async (req, res) => {
  try {
    const id_user = req.user.id_user;

    // Menarik data History beserta detail Teks dan Ringkasannya (Eager Loading / JOIN)
    const histories = await History.findAll({
      where: { id_user },
      order: [['timestamp', 'DESC']], // Urutkan dari yang terbaru
      include: [
        {
          model: Text,
          attributes: ['text_origin']
        },
        {
          model: Summary,
          attributes: ['summary_text', 'processing_time'],
          include: [
            {
              model: AI_Model,
              attributes: ['model_name']
            }
          ]
        }
      ]
    });

    res.status(200).json({
      status: 'success',
      data: histories
    });
  } catch (error) {
    logError('History Error', error);
    errorResponse(res, 500, 'Gagal mengambil riwayat pengguna.');
  }
};