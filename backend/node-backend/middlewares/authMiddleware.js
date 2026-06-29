// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
  // 1. Ambil header Authorization
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    return res.status(401).json({ status: 'error', message: 'Akses ditolak. Token tidak disediakan.' });
  }

  // 2. Pisahkan kata "Bearer" dari token (Standar pengiriman token: "Bearer eyJhbGciOi...")
  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ status: 'error', message: 'Akses ditolak. Format token salah.' });
  }

  // 3. Verifikasi keaslian token
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // Menyisipkan data user (id_user, email) ke dalam objek request
    next(); // Lolos, silakan lanjut ke Controller
  } catch (error) {
    res.status(400).json({ status: 'error', message: 'Token tidak valid atau sudah kedaluwarsa.' });
  }
};