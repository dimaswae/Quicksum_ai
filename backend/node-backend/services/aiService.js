// services/aiService.js
const axios = require('axios');

exports.generateSummary = async (text, modelName) => {
  try {

const AI_BACKEND_URL = "http://host.docker.internal:8000/summarize";


    const response = await axios.post(AI_BACKEND_URL, {
      text: text
    });

    // Mengambil field 'summary' sesuai kontrak API dari tim AI (MKhansa)
    return response.data.summary;

  } catch (error) {
    // Log error lebih detail untuk memudahkan debugging tim
    if (error.response) {
      // Server AI merespons tapi dengan status code error (4xx/5xx)
      console.error('AI Backend Error Response:', error.response.data);
      throw new Error(`AI Service Error: ${error.response.data.detail || 'Gagal meringkas teks'}`);
    } else if (error.request) {
      // Request terkirim tapi tidak ada jawaban (Server AI mati)
      console.error('AI Backend Unreachable:', error.message);
      throw new Error('Server AI (FastAPI) tidak merespons. Pastikan port 8000 sudah terbuka.');
    } else {
      console.error('Integration Error:', error.message);
      throw new Error('Terjadi kesalahan saat menghubungkan ke layanan AI.');
    }
  }
};