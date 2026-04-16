import { useContext, useState } from 'react';
import {
  Alert,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  View,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { AuthContext } from '../context/AuthContext';
import CurrencySelector from '../components/CurrencySelector';
import CommonStyles from '../styles/common';
import Colors from '../styles/colors';
import { api } from '../api/api';
import ScreenHeader from '../components/ScreenHeader';

export default function TransactionFormScreen({ route, navigation }) {
  const { token } = useContext(AuthContext);
  const fetchWallet = route?.params?.fetchWallet ?? (() => {});

  const [fromCurrency, setFromCurrency] = useState('PLN');
  const [toCurrency, setToCurrency] = useState('USD');
  const [amountFrom, setAmountFrom] = useState('');
  const [type, setType] = useState('buy');
  const [loading, setLoading] = useState(false);

  const isValid = (value) =>
    /^\d+(\.\d{1,2})?$/.test(value) && Number(value) > 0;

  const handleTransaction = async () => {
    if (fromCurrency === toCurrency) {
      return Alert.alert('Error', 'Currencies must be different');
    }

    if (!isValid(amountFrom)) {
      return Alert.alert('Error', 'Enter a valid amount');
    }

    try {
      setLoading(true);

      await api.post(
        '/transaction',
        { type, fromCurrency, toCurrency, amountFrom: Number(amountFrom) },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      Alert.alert('Success', 'Transaction completed');
      fetchWallet();
      setAmountFrom('');
      navigation.goBack();
    } catch (err) {
      Alert.alert('Error', err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={CommonStyles.registerScreen}>
      <ScreenHeader title='Make Transaction' />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={CommonStyles.pagePadding}
      >
        <Text style={CommonStyles.smallLabel}>CURRENCY EXCHANGE</Text>

        <Text style={styles.title}>Make Transaction</Text>

        <Text style={styles.subtitle}>
          Exchange funds between available currencies in your wallet.
        </Text>

        <View style={styles.section}>
          <Text style={CommonStyles.fieldLabel}>TYPE</Text>

          <View style={styles.typeRow}>
            <TouchableOpacity
              style={[
                styles.typeButton,
                type === 'buy' && styles.typeButtonBuyActive,
              ]}
              onPress={() => setType('buy')}
            >
              <Text
                style={[
                  styles.typeText,
                  type === 'buy' && styles.typeTextActiveDark,
                ]}
              >
                BUY
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.typeButton,
                type === 'sell' && styles.typeButtonSellActive,
              ]}
              onPress={() => setType('sell')}
            >
              <Text
                style={[
                  styles.typeText,
                  type === 'sell' && styles.typeTextActiveLight,
                ]}
              >
                SELL
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.selectorBlock}>
          <CurrencySelector
            label='From Currency'
            value={fromCurrency}
            onSelect={setFromCurrency}
          />
        </View>

        <View style={styles.selectorBlock}>
          <CurrencySelector
            label='To Currency'
            value={toCurrency}
            onSelect={setToCurrency}
          />
        </View>

        <View style={styles.section}>
          <Text style={CommonStyles.fieldLabel}>AMOUNT</Text>

          <View style={styles.amountRow}>
            <Text style={styles.amountCurrency}>{fromCurrency}</Text>
            <TextInput
              style={styles.amountInput}
              value={amountFrom}
              onChangeText={setAmountFrom}
              keyboardType='numeric'
              placeholder='0.00'
              placeholderTextColor='#3B3F46'
            />
          </View>
        </View>

        {!!amountFrom && (
          <View style={styles.previewCard}>
            <Text style={styles.previewLabel}>Transaction summary</Text>
            <Text style={styles.previewText}>
              {type.toUpperCase()} {amountFrom} {fromCurrency} → {toCurrency}
            </Text>
          </View>
        )}

        <TouchableOpacity
          style={[
            CommonStyles.buttonPrimary,
            styles.submitButton,
            loading && styles.disabled,
          ]}
          onPress={handleTransaction}
          disabled={loading}
        >
          <Ionicons
            name='swap-horizontal-outline'
            size={20}
            color={Colors.darkText}
          />
          <Text style={CommonStyles.buttonPrimaryText}>
            {loading ? 'Processing...' : 'Submit Transaction'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    marginBottom: 10,
    fontSize: 42,
    fontWeight: '800',
    color: Colors.textPrimary,
  },

  subtitle: {
    marginBottom: 34,
    fontSize: 18,
    lineHeight: 28,
    color: '#A1A9B3',
  },

  section: {
    marginBottom: 26,
  },

  typeRow: {
    flexDirection: 'row',
    gap: 12,
  },

  typeButton: {
    flex: 1,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#1E2B35',
    backgroundColor: '#11171D',
  },

  typeButtonBuyActive: {
    backgroundColor: Colors.accent,
    borderColor: Colors.accent,
  },

  typeButtonSellActive: {
    backgroundColor: Colors.textError,
    borderColor: Colors.textError,
  },

  typeText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
  },

  typeTextActiveDark: {
    color: Colors.darkText,
  },

  typeTextActiveLight: {
    color: '#FFFFFF',
  },

  selectorBlock: {
    marginBottom: 18,
    alignItems: 'center',
  },

  amountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderDefault,
  },

  amountCurrency: {
    marginRight: 10,
    fontSize: 18,
    fontWeight: '700',
    color: Colors.accent,
  },

  amountInput: {
    flex: 1,
    paddingVertical: 6,
    fontSize: 20,
    color: Colors.textPrimary,
  },

  previewCard: {
    padding: 16,
    marginBottom: 30,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#1B2630',
    backgroundColor: '#11171D',
  },

  previewLabel: {
    marginBottom: 6,
    fontSize: 13,
    color: '#7C8591',
  },

  previewText: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.textPrimary,
  },

  submitButton: {
    width: '100%',
  },

  disabled: {
    opacity: 0.6,
  },
});
