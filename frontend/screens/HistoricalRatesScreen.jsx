import { useState } from 'react';
import CurrentRatesApi from '../api/currentRates';
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

export default function HistoricalRateScreen() {
  const [rates, setRates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currency, setCurrency] = useState('USD');
  const [start, setStart] = useState('2024-12-01');
  const [end, setEnd] = useState('2024-12-17');

  const fetchRates = async () => {
    try {
      const res = await CurrentRatesApi.get(
        `/history/${currency}/${start}/${end}`
      );
      setRates(res.data);
    } catch (err) {
      console.log('Currency error:', err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Exchange Rates</Text>

      <CurrencySelector
        label='Currency'
        value={currency}
        onSelect={setCurrency}
      />

      <TextInput
        style={styles.input}
        placeholder='Start YYYY-MM-DD'
        value={start}
        onChangeText={setStart}
      />

      <TextInput
        style={styles.input}
        placeholder='End YYYY-MM-DD'
        value={end}
        onChangeText={setEnd}
      />

      <TouchableOpacity style={styles.fetchButton} onPress={fetchRates}>
        <Text style={styles.fetchText}>Fetch</Text>
      </TouchableOpacity>

      <FlatList
        data={rates}
        keyExtractor={(item) => item.effectiveDate}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardDate}>{item.effectiveDate}</Text>
            <Text style={styles.cardRate}>{item.mid.toFixed(2)}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
