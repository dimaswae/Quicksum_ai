// middlewares/validateMiddleware.js

// Fungsi dinamis untuk mengecek apakah kolom yang diwajibkan ada di dalam req.body
exports.validateBody = (requiredFields) => {
  return (req, res, next) => {
    // Cari kolom mana saja yang tidak dikirim oleh client
    const missingFields = requiredFields.filter(field => !req.body[field]);
    
    if (missingFields.length > 0) {
      return res.status(400).json({
        status: 'error',
        message: `Data tidak lengkap. Kolom berikut wajib diisi: ${missingFields.join(', ')}`
      });
    }
    
    next(); // Jika semua lengkap, lanjut ke Controller
  };
};