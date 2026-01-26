import { useCallback, useContext, useState } from 'react';
import TransactionApi from '../api/transaction';
import { AuthContext } from '../context/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';

import {
  Text,
  StyleSheet,
  View,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import CommonStyles from '../styles/common';
import Colors from '../styles/colors';
import Spacing from '../styles/spacing';

export default function TransactionScreen() {
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState([]);

  const { token } = useContext(AuthContext);

  const fetchTransaction = async () => {
    setLoading(true);
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

  useFocusEffect(
    useCallback(() => {
      fetchTransaction();
    }, [token]),
  );

  if (loading)
    return (
      <SafeAreaView style={CommonStyles.container}>
        <ActivityIndicator size='large' color={Colors.textSecondary} />
      </SafeAreaView>
    );

  if (!transactions.length)
    return (
      <SafeAreaView style={CommonStyles.container}>
        <Text style={CommonStyles.title}>No transactions yet</Text>
      </SafeAreaView>
    );

  const renderItem = ({ item }) => (
    <View style={[CommonStyles.card, styles.customCard]}>
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
    padding: Spacing.xl,
    backgroundColor: Colors.backgroundDefault,
  },

  customCard: {
    marginBottom: Spacing.lg,
  },

  type: {
    marginBottom: Spacing.sm,
    fontSize: Spacing.lg,
    textAlign: 'center',
    fontWeight: '700',
  },

  buy: {
    color: Colors.textSecondary,
  },

  sell: {
    color: Colors.textError,
  },

  deposit: {
    color: Colors.textPrimary,
  },

  amount: {
    marginBottom: Spacing.xs,
    fontSize: Spacing.lg,
    fontWeight: '500',
    textAlign: 'center',
    color: Colors.textSecondary,
  },

  rate: {
    marginBottom: Spacing.xs,
    textAlign: 'center',
    fontSize: Spacing.lg,
    color: Colors.textDisabled,
  },

  date: {
    textAlign: 'center',
    fontSize: Spacing.md,
    color: Colors.textDisabled,
  },
});
