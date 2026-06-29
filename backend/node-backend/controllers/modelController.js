// controllers/modelController.js
const { AI_Model } = require('../models/Index');
const { successResponse, errorResponse } = require('../utils/responseHandler');
const { logError } = require('../utils/logger');

exports.getAllModels = async (req, res) => {
  try {
    const models = await AI_Model.findAll({
      attributes: ['id_model', 'model_name', 'version', 'description']
    });

    res.status(200).json({
      status: 'success',
      data: models
    });
  } catch (error) {
    logError('Model Fetch Error', error);
    errorResponse(res, 500, 'Gagal mengambil daftar model AI.');
  }
};