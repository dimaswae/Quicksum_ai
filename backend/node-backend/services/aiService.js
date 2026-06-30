// services/aiService.js
const axios = require('axios');

exports.generateSummary = async (text, length) => {
  try {
    const AI_BACKEND_URL = process.env.AI_BACKEND_URL || 'http://localhost:8000/summarize';

    const response = await axios.post(AI_BACKEND_URL, {
      text,
      length
    });

    return response.data.summary;
  } catch (error) {
    if (error.response) {
      console.error('AI Backend Error Response:', error.response.data);
      throw new Error(`AI Service Error: ${error.response.data.detail || 'Gagal meringkas teks'}`);
    } else if (error.request) {
      console.error('AI Backend Unreachable:', error.message);
      throw new Error('Server AI (FastAPI) tidak merespons. Pastikan AI_BACKEND_URL sudah benar.');
    } else {
      console.error('Integration Error:', error.message);
      throw new Error('Terjadi kesalahan saat menghubungkan ke layanan AI.');
    }
  }
};