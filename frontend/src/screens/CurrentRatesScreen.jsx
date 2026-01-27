import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, StyleSheet, Text } from 'react-native';
import CommonStyles from '../styles/common';
import Colors from '../styles/colors';
import Spacing from '../styles/spacing';
import { api } from '../api/api';
import { ActivityIndicator } from 'react-native';

export default function CurrentRatesScreen() {
  const [rates, setRates] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRates = async () => {
    try {
      const res = await api.get('/currency/current');
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

  if (loading) {
    return (
      <SafeAreaView style={CommonStyles.container}>
        <ActivityIndicator size='large' />
      </SafeAreaView>
    );
  }

  if (!rates.length) {
    return (
      <SafeAreaView style={CommonStyles.container}>
        <Text style={CommonStyles.subtitle}>No exchange rates available</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={CommonStyles.container}>
      <Text style={CommonStyles.title}>Current Rates</Text>

      <View style={CommonStyles.cardContainer}>
        {rates.map((el) => (
          <View key={el.code} style={CommonStyles.card}>
            <Text style={styles.currency}>{el.code}</Text>
            <Text style={styles.rate}>{el.mid.toFixed(2)}</Text>
            <Text style={styles.date}>{el.date}</Text>
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  currency: {
    marginBottom: Spacing.sm,
    fontSize: Spacing.xl,
    fontWeight: '600',
    color: Colors.textSecondary,
  },

  rate: {
    marginBottom: Spacing.xs,
    fontSize: Spacing.xxl,
    fontWeight: '700',
    color: Colors.textPrimary,
  },

  date: {
    fontSize: Spacing.md,
    color: Colors.textDisabled,
  },
});
