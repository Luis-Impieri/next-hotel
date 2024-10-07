// src/utils/auth.ts

import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const login = async (cpf: string, roomNumber: string) => {
  const response = await axios.post(`${API_URL}/auth/login`, { cpf, roomNumber });
  if (response.data.access_token) {
    localStorage.setItem('token', response.data.access_token);
  }
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('token');
};
