import { useCallback, useContext, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import {
  Text,
  StyleSheet,
  View,
  ActivityIndicator,
  FlatList,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../context/AuthContext';
import CommonStyles from '../styles/common';
import Colors from '../styles/colors';
import { api } from '../api/api';
import ScreenHeader from '../components/ScreenHeader';

export default function TransactionScreen() {
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState([]);
  const { token } = useContext(AuthContext);

  const fetchTransaction = async () => {
    setLoading(true);
    try {
      const res = await api.get('/transaction/history', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTransactions(res.data);
    } catch (err) {
      console.log('Transaction error:', err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchTransaction();
    }, [token]),
  );

  const getTypeStyle = (type) => {
    switch (type) {
      case 'buy':
        return {
          badge: styles.buyBadge,
          text: styles.buyText,
          icon: 'arrow-down',
        };
      case 'sell':
        return {
          badge: styles.sellBadge,
          text: styles.sellText,
          icon: 'arrow-up',
        };
      case 'deposit':
        return {
          badge: styles.depositBadge,
          text: styles.depositText,
          icon: 'add',
        };
      default:
        return {
          badge: styles.depositBadge,
          text: styles.depositText,
          icon: 'swap-horizontal',
        };
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleString();
  };

  const renderItem = ({ item }) => {
    const typeStyle = getTypeStyle(item.type);

    return (
      <View style={styles.transactionCard}>
        <View style={styles.cardTopRow}>
          <View style={[styles.typeBadge, typeStyle.badge]}>
            <Ionicons name={typeStyle.icon} size={14} color='#FFFFFF' />
            <Text style={[styles.typeBadgeText, typeStyle.text]}>
              {item.type.toUpperCase()}
            </Text>
          </View>
        </View>

        <Text style={styles.amountMain}>
          {item.amountFrom} {item.fromCurrency}
          {item.toCurrency
            ? ` → ${Number(item.amountTo).toFixed(2)} ${item.toCurrency}`
            : ''}
        </Text>

        {!!item.rateUsed && (
          <Text style={styles.rateText}>Rate: {item.rateUsed}</Text>
        )}

        <Text style={styles.dateText}>{formatDate(item.createdAt)}</Text>
      </View>
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={CommonStyles.registerScreen}>
        <ScreenHeader title='Transaction History' />

        <View style={styles.loaderContainer}>
          <ActivityIndicator size='large' color={Colors.accent} />
        </View>
      </SafeAreaView>
    );
  }

  if (!transactions.length) {
    return (
      <SafeAreaView style={CommonStyles.registerScreen}>
        <ScreenHeader title='Transaction History' />

        <View style={styles.emptyContainer}>
          <Text style={CommonStyles.smallLabel}>TRANSACTION HISTORY</Text>
          <Text style={styles.emptyTitle}>No transactions yet</Text>
          <Text style={styles.emptySubtitle}>
            Your deposits and exchanges will appear here.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={CommonStyles.registerScreen}>
      <ScreenHeader title='Transaction History' />

      <FlatList
        data={transactions}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={CommonStyles.smallLabel}>TRANSACTION HISTORY</Text>
            <Text style={styles.title}>Recent Activity</Text>
            <Text style={styles.subtitle}>
              Review your latest deposits and currency exchanges.
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  emptyContainer: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },

  emptyTitle: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 34,
    fontWeight: '800',
    color: Colors.textPrimary,
  },

  emptySubtitle: {
    fontSize: 17,
    lineHeight: 26,
    color: '#A1A9B3',
  },

  listContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 30,
  },

  header: {
    marginBottom: 20,
  },

  title: {
    marginBottom: 10,
    marginTop: 10,
    fontSize: 40,
    fontWeight: '800',
    color: Colors.textPrimary,
  },

  subtitle: {
    marginBottom: 10,
    fontSize: 18,
    lineHeight: 28,
    color: '#A1A9B3',
  },

  transactionCard: {
    marginBottom: 14,
    padding: 18,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#18232C',
    backgroundColor: '#10171D',
  },

  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 16,
  },

  typeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    alignSelf: 'flex-start',
    borderRadius: 50,
  },

  buyBadge: {
    backgroundColor: 'rgba(43,255,158,0.16)',
  },

  sellBadge: {
    backgroundColor: 'rgba(255,82,82,0.16)',
  },

  depositBadge: {
    backgroundColor: 'rgba(120,130,145,0.18)',
  },

  typeBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
  },

  buyText: {
    color: Colors.accent,
  },

  sellText: {
    color: Colors.textError,
  },

  depositText: {
    color: '#C2CAD3',
  },

  amountMain: {
    marginBottom: 10,
    fontSize: 22,
    fontWeight: '800',
    color: Colors.textPrimary,
  },

  rateText: {
    marginBottom: 8,
    fontSize: 15,
    color: '#A1A9B3',
  },

  dateText: {
    fontSize: 13,
    color: '#6B7280',
  },
});
