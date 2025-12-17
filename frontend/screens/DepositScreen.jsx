import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import WalletApi from '../api/wallet';
import { StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function DepositScreen({ navigation }) {
  const { token } = useContext(AuthContext);
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  const handleDeposit = async () => {
    if (!amount) return;

    try {
      setLoading(true);
      const res = await WalletApi.post(
        '/deposit',
        { amount, currency: 'PLN' },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAmount('');
      navigation.goBack();
    } catch (err) {
      console.log('Error', err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Deposit PLN</Text>

      <Text style={styles.subtitle}>Amount</Text>
      <TextInput
        style={styles.input}
        keyboardType='numeric'
        placeholder='Amount'
        value={amount}
        onChangeText={setAmount}
      />

      <TouchableOpacity
        style={[styles.submitButton, loading && styles.disabled]}
        disabled={loading}
        onPress={handleDeposit}
      >
        <Text style={styles.buttonText}>
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
    marginBottom: 24,
    fontSize: 26,
    fontWeight: '700',
    textAlign: 'center',
    color: '#05668d',
  },

  subtitle: {
    marginBottom: 8,
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '600',
    color: '#028090',
  },

  input: {
    width: '100%',
    maxWidth: 300,
    padding: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 16,
    borderColor: '#a3d2ca',
    backgroundColor: '#fff',
  },

  submitButton: {
    width: '100%',
    maxWidth: 300,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#028090',
  },

  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },

  disabled: {
    opacity: 0.6,
  },
});
