import { useContext, useEffect, useState } from 'react';
import TransactionApi from '../api/transaction';

export default function TransactionScreen() {
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState(null);

  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const res = await TransactionApi.get('/history', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTransactions(res.data);
      } catch (err) {
        console.log(err);
        console.log('Transaction error:', err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTransaction();
  }, []);
}
