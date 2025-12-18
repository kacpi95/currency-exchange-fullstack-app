import axios from 'axios';

const CurrentRatesApi = axios.create({
  baseURL: 'http://192.168.2.57:5000/api/currency',
});

export default CurrentRatesApi;
