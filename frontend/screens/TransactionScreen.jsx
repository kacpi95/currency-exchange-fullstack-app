import { useContext, useEffect, useState } from 'react';
import TransactionApi from '../api/transaction';
import { AuthContext } from '../context/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Text,
  StyleSheet,
  View,
  ActivityIndicator,
  FlatList,
} from 'react-native';

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

  if (loading)
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size='large' color='#028090' />
      </SafeAreaView>
    );

  if (!transactions.length)
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.emptyText}>No transactions yet</Text>
      </SafeAreaView>
    );

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text
        style={[
          styles.type,
          item.type === 'buy'
            ? styles.buy
            : item.type === 'sell'
            ? styles.sell
            : styles.deposit,
        ]}
      >
        {item.type.toUpperCase()}
      </Text>
      <Text style={styles.amount}>
        {item.amountFrom} {item.fromCurrency} → {item.amountTo.toFixed(2)}
        {item.toCurrency}
      </Text>
      <Text style={styles.rate}>Rate: {item.rateUsed}</Text>
      <Text style={styles.date}>
        {new Date(item.createdAt).toLocaleString()}
      </Text>
    </View>
  );

  return (
    <FlatList
      data={transactions}
      keyExtractor={(item) => item._id}
      renderItem={renderItem}
      contentContainerStyle={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexGrow: 1,
    alignItems: 'center',
    backgroundColor: '#e8f7f2',
  },

  emptyText: {
    marginTop: 50,
    fontSize: 18,
    textAlign: 'center',
    color: '#05668d',
  },

  card: {
    width: '100%',
    maxWidth: 360,
    marginBottom: 15,
    borderRadius: 12,
    borderWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderColor: '#a3d2ca',
    backgroundColor: '#ffffff',
  },

  type: {
    marginBottom: 6,
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '700',
  },

  buy: { color: '#028090' },
  sell: { color: '#c1121f' },
  deposit: { color: '#05668d' },

  amount: {
    marginBottom: 4,
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },

  rate: {
    marginBottom: 4,
    textAlign: 'center',
    fontSize: 14,
    color: '#666',
  },

  date: {
    textAlign: 'center',
    fontSize: 12,
    color: '#999',
  },
});
