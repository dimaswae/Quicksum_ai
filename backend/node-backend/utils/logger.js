// utils/logger.js

exports.logInfo = (message, data = '') => {
  const timestamp = new Date().toISOString();
  console.log(`[INFO] ${timestamp} - ${message}`, data ? data : '');
};

exports.logError = (message, error = '') => {
  const timestamp = new Date().toISOString();
  console.error(`[ERROR] ${timestamp} - 🔥 ${message}`, error ? error : '');
};