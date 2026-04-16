import { useCallback, useContext, useState } from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Ionicons, Feather } from '@expo/vector-icons';

import { AuthContext } from '../context/AuthContext';
import { api } from '../api/api';
import CommonStyles from '../styles/common';
import Colors from '../styles/colors';
import ScreenHeader from '../components/ScreenHeader';

export default function HomeScreen() {
  const [wallet, setWallet] = useState(null);
  const [loading, setLoading] = useState(false);

  const { user, logout, token } = useContext(AuthContext);
  const navigation = useNavigation();

  const displayName = user?.name || user?.email || 'User';

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

  const handleLogout = () => {
    logout();
  };

  const totalBalance = wallet?.balance?.PLN ?? '0.00';

  return (
    <SafeAreaView style={CommonStyles.registerScreen}>
      <ScreenHeader title='Dashboard' showBack={false} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.dashboardLabel}>DASHBOARD</Text>

        <Text style={styles.welcomeText}>
          Welcome, <Text style={styles.welcomeAccent}>{displayName}</Text>
        </Text>

        <View style={styles.balanceCard}>
          <View style={styles.balanceTopRow}>
            <View>
              <Text style={styles.balanceLabel}>TOTAL BALANCE</Text>
              <Text style={styles.balanceAmount}>
                {loading ? 'Loading...' : `${totalBalance} PLN`}
              </Text>
            </View>

            <View style={styles.growthBadge}>
              <Feather name='trending-up' size={14} color={Colors.accentSoft} />
              <Text style={styles.growthText}>Live</Text>
            </View>
          </View>

          <View style={styles.balanceButtons}>
            <TouchableOpacity
              style={styles.primaryAction}
              onPress={() => navigation.navigate('Wallet')}
            >
              <Ionicons
                name='wallet-outline'
                size={18}
                color={Colors.darkText}
              />
              <Text style={styles.primaryActionText}>Wallet</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryAction}
              onPress={() => navigation.navigate('Rates')}
            >
              <Text style={styles.secondaryActionText}>Exchange Rates</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Quick actions</Text>

        <View style={styles.actionGrid}>
          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => navigation.navigate('Wallet')}
          >
            <View style={styles.actionIcon}>
              <Ionicons name='wallet-outline' size={20} color={Colors.accent} />
            </View>
            <Text style={styles.actionTitle}>Wallet</Text>
            <Text style={styles.actionSubtitle}>
              Check balances and currencies
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => navigation.navigate('History')}
          >
            <View style={styles.actionIcon}>
              <Ionicons name='time-outline' size={20} color={Colors.accent} />
            </View>
            <Text style={styles.actionTitle}>History</Text>
            <Text style={styles.actionSubtitle}>View your transactions</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => navigation.navigate('Rates')}
          >
            <View style={styles.actionIcon}>
              <Ionicons
                name='swap-horizontal-outline'
                size={20}
                color={Colors.accent}
              />
            </View>
            <Text style={styles.actionTitle}>Exchange</Text>
            <Text style={styles.actionSubtitle}>Check exchange rates</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.sessionCard}>
          <View>
            <Text style={styles.sessionTitle}>Session</Text>
            <Text style={styles.sessionSubtitle}>
              Securely end your current session.
            </Text>
          </View>

          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Logout</Text>
            <Ionicons
              name='log-out-outline'
              size={18}
              color={Colors.textError}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    ...CommonStyles.pagePadding,
  },

  dashboardLabel: {
    ...CommonStyles.smallLabel,
    marginBottom: 8,
  },

  welcomeText: {
    ...CommonStyles.titleHuge,
    marginBottom: 26,
  },

  welcomeAccent: {
    color: Colors.accent,
  },

  balanceCard: {
    ...CommonStyles.cardDefault,
    marginBottom: 26,
    backgroundColor: '#11171D',
    borderColor: '#1B2630',
  },

  balanceTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 22,
    gap: 12,
  },

  balanceLabel: {
    marginBottom: 8,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.5,
    color: '#7C8591',
  },

  balanceAmount: {
    fontSize: 34,
    fontWeight: '800',
    color: Colors.textPrimary,
  },

  growthBadge: {
    ...CommonStyles.badgePill,
  },

  growthText: {
    ...CommonStyles.badgeText,
  },

  balanceButtons: {
    gap: 12,
  },

  primaryAction: {
    ...CommonStyles.buttonPrimary,
  },

  primaryActionText: {
    ...CommonStyles.buttonPrimaryText,
  },

  secondaryAction: {
    ...CommonStyles.buttonSecondary,
  },

  secondaryActionText: {
    ...CommonStyles.buttonSecondaryText,
  },

  sectionTitle: {
    ...CommonStyles.sectionTitle,
  },

  actionGrid: {
    gap: 14,
    marginBottom: 26,
  },

  actionCard: {
    ...CommonStyles.cardSecondary,
  },

  actionIcon: {
    ...CommonStyles.actionIcon,
  },

  actionTitle: {
    ...CommonStyles.actionTitle,
  },

  actionSubtitle: {
    ...CommonStyles.actionSubtitle,
  },

  sessionCard: {
    ...CommonStyles.cardTertiary,
    marginBottom: 10,
  },

  sessionTitle: {
    marginBottom: 6,
    fontSize: 22,
    fontWeight: '700',
    color: Colors.textPrimary,
  },

  sessionSubtitle: {
    marginBottom: 18,
    fontSize: 14,
    lineHeight: 21,
    color: '#8B95A1',
  },

  logoutButton: {
    ...CommonStyles.logoutButton,
  },

  logoutButtonText: {
    ...CommonStyles.logoutButtonText,
  },
});
