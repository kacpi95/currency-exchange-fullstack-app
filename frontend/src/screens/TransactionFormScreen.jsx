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
