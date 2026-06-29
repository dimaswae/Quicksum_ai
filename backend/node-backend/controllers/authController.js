// controllers/authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models/Index');
const { successResponse, errorResponse } = require('../utils/responseHandler');
const { logError } = require('../utils/logger');

exports.register = async (req, res) => {
  try {
    const { nama, email, password } = req.body;

    // 1. Cek apakah email sudah terdaftar
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ status: 'error', message: 'Email sudah digunakan.' });
    }

    // 2. Enkripsi password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. Simpan ke database
    const newUser = await User.create({
      nama,
      email,
      password: hashedPassword
    });

    res.status(201).json({
      status: 'success',
      message: 'Registrasi berhasil.',
      data: { id_user: newUser.id_user, nama: newUser.nama, email: newUser.email }
    });
  } catch (error) {
    console.error('Register Error:', error);
    res.status(500).json({ status: 'error', message: 'Terjadi kesalahan pada server.' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Cek ketersediaan user
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ status: 'error', message: 'Email tidak ditemukan.' });
    }

    // 2. Verifikasi password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ status: 'error', message: 'Password salah.' });
    }

    // 3. Buat Token JWT
    const token = jwt.sign(
      { id_user: user.id_user, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(200).json({
      status: 'success',
      message: 'Login berhasil.',
      token,
      data: { id_user: user.id_user, nama: user.nama, email: user.email }
    });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ status: 'error', message: 'Terjadi kesalahan pada server.' });
  }
};