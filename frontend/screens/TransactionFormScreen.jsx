import { useContext } from 'react';
import { useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import {
  Alert,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  View,
} from 'react-native';
import TransactionApi from '../api/transaction';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TransactionFormScreen({ route }) {
  const { token } = useContext(AuthContext);
  const fetchWallet = route?.params?.fetchWallet ?? (() => {});

  const [fromCurrency, setFromCurrency] = useState('PLN');
  const [toCurrency, setToCurrency] = useState('USD');
  const [amountFrom, setAmountFrom] = useState('');
  const [type, setType] = useState('buy');
  const [loading, setLoading] = useState(false);

  const handleTransaction = async () => {
    if (!amountFrom) return Alert.alert('Error', 'Enter amount');

    setLoading(true);

    try {
      const res = await TransactionApi.post(
        '/',
        { type, fromCurrency, toCurrency, amountFrom },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      Alert.alert(`Success, Transaction completed`);
      fetchWallet();
    } catch (err) {
      Alert.alert('Error', err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Make Transaction</Text>

      <Text style={styles.subtitle}>Type</Text>

      <View style={styles.typeRow}>
        <TouchableOpacity
          style={[styles.typeButton, type === 'buy' && styles.buyActive]}
          onPress={() => setType('buy')}
        >
          <Text style={styles.typeText}>BUY</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.typeButton, type === 'sell' && styles.sellActive]}
          onPress={() => setType('sell')}
        >
          <Text style={styles.typeText}>SELL</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.subtitle}>From currency</Text>
      <TextInput
        style={styles.input}
        value={fromCurrency}
        onChangeText={setFromCurrency}
        autoCapitalize='characters'
      />

      <Text style={styles.subtitle}>To currency</Text>
      <TextInput
        style={styles.input}
        value={toCurrency}
        onChangeText={setToCurrency}
        autoCapitalize='characters'
      />

      <Text style={styles.subtitle}>Amount</Text>
      <TextInput
        style={styles.input}
        value={amountFrom}
        onChangeText={setAmountFrom}
        keyboardType='numeric'
      />

      <TouchableOpacity
        style={[styles.submitButton, loading && styles.disabled]}
        onPress={handleTransaction}
        disabled={loading}
      >
        <Text style={styles.submitText}>
          {loading ? 'Processing...' : 'Submit'}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
