import axios from 'axios';

const HistoricalRatesApi = axios.create({
  baseURL: `http://192.168.2.57:5000/api/currency/history`,
});

export default HistoricalRatesApi;
