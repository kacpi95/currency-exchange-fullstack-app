import axios from 'axios';

const WalletApi = axios.create({
  baseURL: 'http://192.168.2.57:5000/api/wallet',
});

export default WalletApi;
