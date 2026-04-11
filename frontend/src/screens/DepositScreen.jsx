import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import {
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import CommonStyles from '../styles/common';
import Colors from '../styles/colors';
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

      await api.post(
        '/wallet/deposit',
        { amount, currency: 'PLN' },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      setAmount('');
      navigation.goBack();
    } catch (err) {
      console.log('Error', err.response?.data?.message || err.message);
      Alert.alert('Error', 'Deposit failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={CommonStyles.registerScreen}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={CommonStyles.pagePadding}
      >
        <Text style={CommonStyles.smallLabel}>ADD FUNDS</Text>

        <Text style={styles.title}>Deposit PLN</Text>

        <Text style={styles.subtitle}>
          Enter the amount you want to add to your wallet.
        </Text>

        <View style={styles.inputBlock}>
          <Text style={CommonStyles.fieldLabel}>AMOUNT</Text>

          <View style={styles.inputRow}>
            <Text style={styles.currency}>PLN</Text>

            <TextInput
              style={styles.input}
              keyboardType='numeric'
              placeholder='0.00'
              placeholderTextColor='#3B3F46'
              value={amount}
              onChangeText={setAmount}
            />
          </View>
        </View>

        {!!amount && (
          <View style={styles.previewBox}>
            <Text style={styles.previewLabel}>You will deposit</Text>
            <Text style={styles.previewAmount}>{amount} PLN</Text>
          </View>
        )}

        <TouchableOpacity
          style={[
            CommonStyles.buttonPrimary,
            styles.fullWidthButton,
            loading && styles.disabled,
          ]}
          disabled={loading}
          onPress={handleDeposit}
        >
          <Ionicons
            name='add-circle-outline'
            size={20}
            color={Colors.darkText}
          />
          <Text style={CommonStyles.buttonPrimaryText}>
            {loading ? 'Processing...' : 'Confirm Deposit'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  disabled: {
    opacity: 0.6,
  },
});
