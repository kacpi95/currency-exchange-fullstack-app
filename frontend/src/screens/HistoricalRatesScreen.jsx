import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  StyleSheet,
  TextInput,
  Text,
  FlatList,
  TouchableOpacity,
  View,
} from 'react-native';
import CurrencySelector from '../components/CurrencySelector';
import CommonStyles from '../styles/common';
import Colors from '../styles/colors';
import Spacing from '../styles/spacing';
import { api } from '../api/api';

export default function HistoricalRateScreen() {
  const [rates, setRates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currency, setCurrency] = useState('USD');
  const [start, setStart] = useState('2024-12-01');
  const [end, setEnd] = useState('2024-12-17');

  const fetchRates = async () => {
    try {
      const res = await api.get(
        `/currency/history/${currency}/${start}/${end}`,
      );
      setRates(res.data);
    } catch (err) {
      console.log('Currency error:', err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={CommonStyles.container}>
      <Text style={CommonStyles.title}>Exchange Rates</Text>

      <CurrencySelector
        label='Currency'
        value={currency}
        onSelect={setCurrency}
      />
      <TextInput
        style={CommonStyles.input}
        placeholder='Start YYYY-MM-DD'
        value={start}
        onChangeText={setStart}
      />
      <TextInput
        style={CommonStyles.input}
        placeholder='End YYYY-MM-DD'
        value={end}
        onChangeText={setEnd}
      />
      <TouchableOpacity
        style={[CommonStyles.button, styles.customButton]}
        onPress={fetchRates}
      >
        <Text style={CommonStyles.buttonText}>Fetch</Text>
      </TouchableOpacity>

      <FlatList
        data={rates}
        keyExtractor={(item) => item.effectiveDate}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <View style={[CommonStyles.card, styles.customCard]}>
            <Text style={styles.cardDate}>{item.effectiveDate}</Text>
            <Text style={styles.cardRate}>{item.mid.toFixed(2)}</Text>
          </View>
        )}
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
