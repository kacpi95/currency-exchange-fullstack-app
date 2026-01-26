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
import CommonStyles from '../styles/common';
import Colors from '../styles/colors';
import Spacing from '../styles/spacing';

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
        { type, fromCurrency, toCurrency, amountFrom: Number(amountFrom) },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      Alert.alert(`Success, Transaction completed`);
      fetchWallet();
      setAmountFrom('');
    } catch (err) {
      Alert.alert('Error', err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <SafeAreaView style={CommonStyles.container}>
      <Text style={CommonStyles.title}>Make Transaction</Text>

      <Text style={CommonStyles.subtitle}>Type</Text>

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

      <Text style={CommonStyles.subtitle}>Amount</Text>
      <TextInput
        style={CommonStyles.input}
        value={amountFrom}
        onChangeText={setAmountFrom}
        keyboardType='numeric'
      />

      <TouchableOpacity
        style={[CommonStyles.button, loading && styles.disabled]}
        onPress={handleTransaction}
        disabled={loading}
      >
        <Text style={CommonStyles.buttonText}>
          {loading ? 'Processing...' : 'Submit'}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  typeRow: {
    marginBottom: Spacing.md,
    flexDirection: 'row',
    gap: Spacing.md,
  },

  typeButton: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xxxl,
    borderRadius: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.borderDefault,
    backgroundColor: Colors.backgroundWhite,
  },

  buyActive: {
    backgroundColor: Colors.textSecondary,
  },

  sellActive: {
    backgroundColor: Colors.textError,
  },

  typeText: {
    fontWeight: '700',
    color: Colors.textPrimary,
  },

  typeTextActive: {
    color: Colors.backgroundWhite,
  },

  disabled: {
    opacity: 0.6,
  },
});
