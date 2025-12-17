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
import CurrencySelector from '../components/CurrencySelector';

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
          <Text
            style={[styles.typeText, type === 'buy' && styles.typeTextActive]}
          >
            BUY
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.typeButton, type === 'sell' && styles.sellActive]}
          onPress={() => setType('sell')}
        >
          <Text
            style={[styles.typeText, type === 'sell' && styles.typeTextActive]}
          >
            SELL
          </Text>
        </TouchableOpacity>
      </View>

      <CurrencySelector
        label='From Currency'
        value={fromCurrency}
        onSelect={setFromCurrency}
      />
      <CurrencySelector
        label='To Currency'
        value={toCurrency}
        onSelect={setToCurrency}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#e8f7f2',
  },

  title: {
    marginBottom: 20,
    fontSize: 26,
    fontWeight: '700',
    textAlign: 'center',
    color: '#05668d',
  },

  subtitle: {
    marginBottom: 6,
    marginTop: 12,
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    color: '#028090',
  },

  typeRow: {
    marginBottom: 10,
    flexDirection: 'row',
    gap: 12,
  },

  typeButton: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#a3d2ca',
    backgroundColor: '#fff',
  },

  buyActive: {
    backgroundColor: '#028090',
  },

  sellActive: {
    backgroundColor: '#c1121f',
  },

  typeText: {
    fontWeight: '700',
    textAlign: 'center',
    color: '#05668d',
  },

  typeTextActive: {
    color: '#fff',
  },

  input: {
    width: '100%',
    maxWidth: 300,
    padding: 12,
    borderWidth: 1,
    borderRadius: 8,
    textAlign: 'center',
    backgroundColor: '#fff',
    borderColor: '#a3d2ca',
  },

  submitButton: {
    width: '100%',
    marginTop: 20,
    paddingVertical: 14,
    maxWidth: 300,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#028090',
  },

  submitText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },

  disabled: {
    opacity: 0.6,
  },
});
