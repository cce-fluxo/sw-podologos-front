import axios from 'axios';

const api = axios.create({
  baseURL: 'https://podologos-back-ecbm.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  async (config) => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Erro ao recuperar o token:', error);
    }
    return config;
  },
  (error) => {
    // Trata erros de requisição
    return Promise.reject(error);
  }
);

export default api;
