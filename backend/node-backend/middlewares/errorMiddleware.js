// middlewares/errorMiddleware.js

module.exports = (err, req, res, next) => {
  // Cetak log error di terminal server (Docker)
  console.error('🔥 Global Error Handler Caught:', err.stack);

  // Tentukan status code, default 500 (Internal Server Error)
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Terjadi kesalahan internal pada server.';

  // Kirim respons error yang seragam
  res.status(statusCode).json({
    status: 'error',
    message: message,
    // (Opsional) Tampilkan stack trace hanya jika di mode development, jangan di production
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};