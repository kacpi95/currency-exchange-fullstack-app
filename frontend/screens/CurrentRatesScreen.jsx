import { useEffect, useState } from 'react';
import CurrentRatesApi from '../api/currentRates';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, StyleSheet, Text } from 'react-native';

export default function CurrentRatesScreen() {
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

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Current Rates</Text>

      <View style={styles.cardContainer}>
        {rates.map((el) => (
          <View key={el.code} style={styles.card}>
            <Text style={styles.currency}>{el.code}</Text>
            <Text style={styles.rate}>{el.mid.toFixed(2)}</Text>
            <Text style={styles.date}>{el.date}</Text>
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
