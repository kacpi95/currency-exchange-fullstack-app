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
import Spacing from '../styles/spacing';

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
  actions: {
    width: '100%',
    gap: Spacing.lg,
    alignItems: 'center',
  },

  customCardTitle: {
    fontSize: Spacing.lg,
  },

  logoutCard: {
    backgroundColor: Colors.logoutCardBackground,
    borderColor: Colors.logoutCardBorder,
  },

  customLogoutText: {
    color: Colors.textError,
  },
});
