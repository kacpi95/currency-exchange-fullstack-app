import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import CommonStyles from '../styles/common';
import Spacing from '../styles/spacing';
import Colors from '../styles/colors';
import { api } from '../api/api';

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

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <View style={styles.left}>
          <View style={styles.icon}>
            <Ionicons name='cash-outline' size={16} color={Colors.accent} />
          </View>
          <Text style={styles.currency}>{item.code}</Text>
        </View>

        <Text style={styles.rate}>{item.mid.toFixed(2)}</Text>
      </View>

      <Text style={styles.date}>{item.date}</Text>
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={CommonStyles.registerScreen}>
        <View style={styles.loader}>
          <ActivityIndicator size='large' color={Colors.accent} />
        </View>
      </SafeAreaView>
    );
  }

  if (!rates.length) {
    return (
      <SafeAreaView style={CommonStyles.registerScreen}>
        <View style={styles.loader}>
          <Text style={styles.empty}>No exchange rates available</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={CommonStyles.registerScreen}>
      <FlatList
        data={rates}
        keyExtractor={(item) => item.code}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={CommonStyles.smallLabel}>LIVE MARKET</Text>
            <Text style={styles.title}>Current Rates</Text>
            <Text style={styles.subtitle}>
              Updated currency exchange values (NBP API)
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 30,
  },

  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  empty: {
    fontSize: 18,
    color: Colors.textSecondary,
  },

  header: {
    marginBottom: 20,
  },

  title: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 40,
    fontWeight: '800',
    color: Colors.textPrimary,
  },

  subtitle: {
    fontSize: 18,
    lineHeight: 28,
    color: '#A1A9B3',
  },

  card: {
    marginBottom: 12,
    padding: 18,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#1A232C',
    backgroundColor: '#0E1419',
  },

  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },

  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  icon: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: 'rgba(43,255,158,0.08)',
  },

  currency: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.textPrimary,
  },

  rate: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.accent,
  },

  date: {
    fontSize: 13,
    color: '#6B7280',
  },
});
