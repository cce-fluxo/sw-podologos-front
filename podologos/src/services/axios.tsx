import axios from 'axios';

const api = axios.create({
  baseURL: 'https://podologos-back-ecbm.onrender.com',
});

export default api;
