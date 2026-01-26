import axios from 'axios';

const API = axios.create({
  baseURL: 'http://192.168.2.57:5000/api/user',
});

export default API;
