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
  listContainer: {
    width: '100%',
    alignItems: 'center',
  },

  customCard: {
    marginBottom: Spacing.md,
    paddingHorizontal: 100,
  },

  customButton: {
    marginBottom: Spacing.xl,
  },

  cardDate: {
    marginBottom: Spacing.xs,
    fontSize: Spacing.lg,
    color: Colors.textSecondary,
  },

  cardRate: {
    fontSize: Spacing.xl,
    fontWeight: '700',
    color: Colors.textPrimary,
  },

  currencyRow: {
    marginBottom: Spacing.md,
    gap: Spacing.md,
    flexDirection: 'row',
  },

  currencyButton: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xl,
    borderRadius: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.borderDefault,
    backgroundColor: Colors.backgroundWhite,
  },

  currencyActive: {
    backgroundColor: Colors.textSecondary,
    borderColor: Colors.textSecondary,
  },

  currencyText: {
    fontWeight: '600',
    color: Colors.textPrimary,
    textAlign: 'center',
  },

  currencyTextActive: {
    color: Colors.backgroundWhite,
  },
});
