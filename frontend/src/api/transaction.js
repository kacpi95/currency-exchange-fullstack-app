import axios from 'axios';

const TransactionApi = axios.create({
  baseURL: 'http://192.168.2.57:5000/api/transaction',
});

export default TransactionApi;
