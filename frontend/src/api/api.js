import axios from 'axios';

const BASE_URL = process.env.PUBLIC_API_URL;

export const API = axios.create({
  baseURL: `${BASE_URL}/api`,
  timeout: 15000,
});

export const authHeader = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
