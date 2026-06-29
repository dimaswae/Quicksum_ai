// utils/responseHandler.js

/**
 * Mengirimkan respons sukses yang seragam.
 */
exports.successResponse = (res, statusCode, message, data = null) => {
  const response = {
    status: 'success',
    message: message,
  };
  
  // Jika ada data yang ingin dikirim, masukkan ke dalam respons
  if (data !== null) {
    response.data = data;
  }
  
  return res.status(statusCode).json(response);
};

/**
 * Mengirimkan respons error yang seragam.
 */
exports.errorResponse = (res, statusCode, message, errorDetails = null) => {
  const response = {
    status: 'error',
    message: message,
  };

  // Hanya lampirkan detail error teknis jika kita tidak berada di tahap production
  // Ini mencegah kebocoran informasi server ke publik
  if (errorDetails && process.env.NODE_ENV === 'development') {
    response.error = errorDetails;
  }

  return res.status(statusCode).json(response);
};