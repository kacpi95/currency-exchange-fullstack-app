import { useCallback, useContext, useState } from 'react';
import {
  ActivityIndicator,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { AuthContext } from '../context/AuthContext';
import CommonStyles from '../styles/common';
import Colors from '../styles/colors';
import { api } from '../api/api';

export default function WalletScreen({ navigation }) {
  const { token } = useContext(AuthContext);
  const [wallet, setWallet] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchWallet = async () => {
    try {
      setLoading(true);

      const res = await api.get('/wallet', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setWallet(res.data);
    } catch (err) {
      console.log('Wallet error:', err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchWallet();
    }, [token]),
  );

  const pln = Number(wallet?.balance?.PLN ?? 0);
  const usd = Number(wallet?.balance?.USD ?? 0);
  const eur = Number(wallet?.balance?.EUR ?? 0);

  const formatAmount = (value) => {
    return value.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const totalBalance = pln;

  if (loading) {
    return (
      <SafeAreaView style={CommonStyles.registerScreen}>
        <View style={styles.loaderContainer}>
          <ActivityIndicator size='large' color={Colors.accent} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={CommonStyles.registerScreen}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={CommonStyles.pagePadding}
      >
        <Text style={CommonStyles.smallLabel}>TOTAL NET WORTH</Text>

        <View style={styles.totalRow}>
          <Text style={styles.totalAmount}>{formatAmount(totalBalance)}</Text>
          <Text style={styles.totalCurrency}>PLN</Text>
        </View>

        <View style={CommonStyles.badgePill}>
          <Feather name='trending-up' size={14} color={Colors.accentSoft} />
          <Text style={CommonStyles.badgeText}>Wallet overview</Text>
        </View>

        <View style={styles.currencyPrimaryCard}>
          <View style={styles.currencyHeader}>
            <View style={styles.currencyLeft}>
              <View style={styles.currencyIconPrimary}>
                <Ionicons
                  name='wallet-outline'
                  size={18}
                  color={Colors.accent}
                />
              </View>
              <Text style={styles.currencyTitle}>PLN</Text>
            </View>

            <Text style={styles.currencyCode}>PLN</Text>
          </View>

          <Text style={styles.primaryAmount}>{formatAmount(pln)}</Text>
        </View>

        <View style={styles.smallCardsRow}>
          <View style={styles.currencySmallCard}>
            <View style={styles.currencyHeader}>
              <View style={styles.currencyLeft}>
                <View style={styles.currencyIconSmall}>
                  <Text style={styles.currencySymbol}>$</Text>
                </View>
                <Text style={styles.smallCardTitle}>US Dollar</Text>
              </View>
            </View>

            <Text style={styles.smallAmount}>{formatAmount(usd)}</Text>
            <Text style={styles.smallHint}>Available balance</Text>
          </View>

          <View style={styles.currencySmallCard}>
            <View style={styles.currencyHeader}>
              <View style={styles.currencyLeft}>
                <View style={styles.currencyIconSmall}>
                  <Text style={styles.currencySymbol}>€</Text>
                </View>
                <Text style={styles.smallCardTitle}>Euro</Text>
              </View>
            </View>

            <Text style={styles.smallAmount}>{formatAmount(eur)}</Text>
            <Text style={styles.smallHint}>Available balance</Text>
          </View>
        </View>

        <TouchableOpacity
          style={[CommonStyles.buttonPrimary, styles.fullWidthButton]}
          onPress={() => navigation.navigate('Deposit')}
        >
          <Ionicons
            name='add-circle-outline'
            size={20}
            color={Colors.darkText}
          />
          <Text style={CommonStyles.buttonPrimaryText}>Deposit PLN</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[CommonStyles.buttonSecondary, styles.outlineButton]}
          onPress={() => navigation.navigate('MakeTransaction')}
        >
          <Ionicons
            name='swap-horizontal-outline'
            size={20}
            color={Colors.accent}
          />
          <Text style={CommonStyles.buttonSecondaryText}>Make Transaction</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  totalRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
    marginTop: 6,
    marginBottom: 14,
  },

  totalAmount: {
    fontSize: 52,
    fontWeight: '800',
    color: Colors.textPrimary,
    lineHeight: 58,
  },

  totalCurrency: {
    marginBottom: 8,
    fontSize: 18,
    fontWeight: '700',
    color: Colors.accent,
  },

  currencyPrimaryCard: {
    ...CommonStyles.cardDefault,
    marginTop: 38,
    marginBottom: 16,
    borderColor: '#18232C',
    backgroundColor: '#10171D',
  },

  currencyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  currencyLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  currencyIconPrimary: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18,
    backgroundColor: 'rgba(43,255,158,0.12)',
  },

  currencyIconSmall: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    backgroundColor: '#1A2128',
  },

  currencySymbol: {
    fontSize: 14,
    fontWeight: '700',
    color: '#9AA4AF',
  },

  currencyTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.textPrimary,
  },

  currencyCode: {
    fontSize: 16,
    fontWeight: '700',
    color: '#7C8591',
  },

  primaryAmount: {
    marginTop: 26,
    fontSize: 46,
    fontWeight: '800',
    color: Colors.textPrimary,
  },

  smallCardsRow: {
    flexDirection: 'row',
    gap: 14,
    marginBottom: 34,
  },

  currencySmallCard: {
    ...CommonStyles.cardSecondary,
    flex: 1,
    minHeight: 150,
  },

  smallCardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.textPrimary,
  },

  smallAmount: {
    marginTop: 28,
    marginBottom: 8,
    fontSize: 22,
    fontWeight: '800',
    color: Colors.textPrimary,
  },

  smallHint: {
    fontSize: 13,
    color: '#7C8591',
  },

  fullWidthButton: {
    width: '100%',
    marginBottom: 14,
  },

  outlineButton: {
    width: '100%',
    marginBottom: 10,
    flexDirection: 'row',
    gap: 10,
    borderWidth: 1,
    borderColor: '#1E2B35',
    backgroundColor: 'transparent',
  },
});
