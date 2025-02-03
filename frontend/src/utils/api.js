import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const makeRequest = async (method, url, data) => {
  try {
    const response = await api[method](url, data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
