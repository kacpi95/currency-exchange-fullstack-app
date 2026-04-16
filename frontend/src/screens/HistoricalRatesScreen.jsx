import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  StyleSheet,
  TextInput,
  Text,
  FlatList,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import CurrencySelector from '../components/CurrencySelector';
import CommonStyles from '../styles/common';
import Colors from '../styles/colors';
import Spacing from '../styles/spacing';
import { api } from '../api/api';
import ScreenHeader from '../components/ScreenHeader';

export default function HistoricalRateScreen() {
  const [rates, setRates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currency, setCurrency] = useState('USD');
  const [start, setStart] = useState('2024-12-01');
  const [end, setEnd] = useState('2024-12-17');

  const fetchRates = async () => {
    if (!start || !end) {
      return;
    }

    try {
      setLoading(true);
      const res = await api.get(
        `/currency/history/${currency}/${start}/${end}`,
      );
      setRates(res.data);
    } catch (err) {
      console.log('Currency error:', err.message);
      setRates([]);
    } finally {
      setLoading(false);
    }
  };

  const renderRateItem = ({ item }) => (
    <View style={styles.rateCard}>
      <View style={styles.rateTopRow}>
        <View style={styles.rateIcon}>
          <Ionicons name='time-outline' size={16} color={Colors.accent} />
        </View>

        <Text style={styles.rateValue}>{item.mid.toFixed(2)}</Text>
      </View>

      <Text style={styles.rateDate}>{item.effectiveDate}</Text>
    </View>
  );

  return (
    <SafeAreaView style={CommonStyles.registerScreen}>
      <ScreenHeader title='Historical Rates' />

      <FlatList
        data={rates}
        keyExtractor={(item) => item.effectiveDate}
        renderItem={renderRateItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <View>
            <Text style={CommonStyles.smallLabel}>HISTORICAL DATA</Text>

            <Text style={styles.title}>Historical Rates</Text>

            <Text style={styles.subtitle}>
              Check past exchange rates for a selected currency and date range.
            </Text>

            <View style={styles.selectorBlock}>
              <CurrencySelector
                label='Currency'
                value={currency}
                onSelect={setCurrency}
              />
            </View>

            <View style={styles.inputBlock}>
              <Text style={CommonStyles.fieldLabel}>START DATE</Text>
              <TextInput
                style={styles.lineInput}
                placeholder='YYYY-MM-DD'
                placeholderTextColor='#3B3F46'
                value={start}
                onChangeText={setStart}
              />
            </View>

            <View style={styles.inputBlock}>
              <Text style={CommonStyles.fieldLabel}>END DATE</Text>
              <TextInput
                style={styles.lineInput}
                placeholder='YYYY-MM-DD'
                placeholderTextColor='#3B3F46'
                value={end}
                onChangeText={setEnd}
              />
            </View>

            <TouchableOpacity
              style={[CommonStyles.buttonPrimary, styles.fetchButton]}
              onPress={fetchRates}
              disabled={loading}
            >
              <Ionicons
                name='search-outline'
                size={20}
                color={Colors.darkText}
              />
              <Text style={CommonStyles.buttonPrimaryText}>
                {loading ? 'Loading...' : 'Fetch Rates'}
              </Text>
            </TouchableOpacity>

            {!loading && rates.length === 0 && (
              <View style={styles.emptyBox}>
                <Text style={styles.emptyTitle}>No results yet</Text>
                <Text style={styles.emptyText}>
                  Select currency and date range, then fetch historical rates.
                </Text>
              </View>
            )}

            {loading && (
              <View style={styles.loaderBox}>
                <ActivityIndicator size='large' color={Colors.accent} />
              </View>
            )}

            {!loading && rates.length > 0 && (
              <Text style={styles.resultsLabel}>Results</Text>
            )}
          </View>
        }
        ListEmptyComponent={null}
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

  title: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 40,
    fontWeight: '800',
    color: Colors.textPrimary,
  },

  subtitle: {
    marginBottom: 30,
    fontSize: 18,
    lineHeight: 28,
    color: '#A1A9B3',
  },

  selectorBlock: {
    marginBottom: 18,
    alignItems: 'center',
  },

  inputBlock: {
    marginBottom: 22,
  },

  lineInput: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderDefault,
    paddingVertical: 12,
    fontSize: 17,
    color: Colors.textPrimary,
  },

  fetchButton: {
    width: '100%',
    marginBottom: 24,
  },

  emptyBox: {
    marginBottom: 10,
    padding: 18,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#1B2630',
    backgroundColor: '#11171D',
  },

  emptyTitle: {
    marginBottom: 6,
    fontSize: 18,
    fontWeight: '700',
    color: Colors.textPrimary,
  },

  emptyText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#A5AFBA',
  },

  loaderBox: {
    paddingVertical: 24,
    alignItems: 'center',
  },

  resultsLabel: {
    marginBottom: 16,
    fontSize: 24,
    fontWeight: '800',
    color: Colors.textPrimary,
  },

  rateCard: {
    marginBottom: 12,
    padding: 18,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#1A232C',
    backgroundColor: '#0E1419',
  },

  rateTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },

  rateIcon: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: 'rgba(43,255,158,0.08)',
  },

  rateValue: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.accent,
  },

  rateDate: {
    fontSize: 14,
    color: '#A5AFBA',
  },
});
