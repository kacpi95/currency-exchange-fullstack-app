import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CommonStyles from '../styles/common';
import { api } from '../api/api';

export default function DepositScreen({ navigation }) {
  const { token } = useContext(AuthContext);
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  const isValid = (value) =>
    /^\d+(\.\d{1,2})?$/.test(value) && Number(value) > 0;

  const handleDeposit = async () => {
    if (!isValid(amount)) {
      return Alert.alert('Error', 'Enter a valid amount');
    }

    try {
      setLoading(true);
      const res = await api.post(
        '/wallet/deposit',
        { amount, currency: 'PLN' },
        { headers: { Authorization: `Bearer ${token}` } },
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
    <SafeAreaView style={CommonStyles.container}>
      <Text style={CommonStyles.title}>Deposit PLN</Text>

      <Text style={CommonStyles.subtitle}>Amount</Text>
      <TextInput
        style={[CommonStyles.input, styles.customInput]}
        keyboardType='numeric'
        placeholder='Amount'
        value={amount}
        onChangeText={setAmount}
      />

      <TouchableOpacity
        style={[CommonStyles.button, loading && styles.disabled]}
        disabled={loading}
        onPress={handleDeposit}
      >
        <Text style={CommonStyles.buttonText}>
          {loading ? 'Processing...' : 'Submit'}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  disabled: {
    opacity: 0.6,
  },
});
