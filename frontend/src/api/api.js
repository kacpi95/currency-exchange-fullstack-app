import axios from 'axios';

const BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

export const api = axios.create({
  baseURL: `${BASE_URL}/api`,
  timeout: 15000,
});

export const authHeader = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
