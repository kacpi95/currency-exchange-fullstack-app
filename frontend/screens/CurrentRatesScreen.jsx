import { useEffect, useState } from 'react';
import CurrentRatesApi from '../api/currentRates';

export default function CurrentRates() {
  const [rates, setRates] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRates = async () => {
    try {
      const res = await CurrentRatesApi.get('/current');
      setRates(res.data);
    } catch (err) {
      console.log('Currency error:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRates();
  }, []);
}
