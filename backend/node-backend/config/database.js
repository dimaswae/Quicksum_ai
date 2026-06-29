// config/database.js
const { Sequelize } = require('sequelize');
require('dotenv').config(); // Memuat variabel lingkungan dari file .env

// Membuat instance Sequelize baru dengan data dari .env
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql', // Menggunakan MySQL
    logging: false, // Set ke console.log jika ingin melihat query SQL yang dieksekusi di terminal
    pool: {
      max: 5, // Maksimal koneksi dalam pool
      min: 0,
      acquire: 30000, // Waktu maksimal (ms) untuk mendapatkan koneksi
      idle: 10000 // Waktu maksimal (ms) koneksi diam sebelum dilepas
    }
  }
);

// Fungsi opsional untuk mengetes koneksi (biasanya dipanggil di server.js, tapi bagus ada di sini untuk testing terisolasi)
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('✅ Koneksi ke database berhasil (Testing via config).');
  } catch (error) {
    console.error('❌ Tidak dapat terhubung ke database:', error);
  }
}
testConnection();

module.exports = sequelize;