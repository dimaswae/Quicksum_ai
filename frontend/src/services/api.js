import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 35000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status } = error.response;

      if (status === 429) {
        error.message = 'Terlalu banyak permintaan. Coba lagi dalam 1 menit.';
      } else if (status === 408) {
        error.message = 'Permintaan habis waktu. Periksa koneksimu dan coba lagi.';
      }
    } else if (error.code === 'ECONNABORTED') {
      error.message = 'Permintaan habis waktu. Periksa koneksimu dan coba lagi.';
    }

    return Promise.reject(error);
  }
);

export default api;
