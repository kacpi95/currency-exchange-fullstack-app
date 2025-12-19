import { useContext } from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthContext } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import CommonStyles from '../styles/common';
import Colors from '../styles/colors';
import Spacing from '../styles/spacing';

export default function HomeScreen() {
  const { user, logout } = useContext(AuthContext);
  const navigation = useNavigation();

  const handleLogout = () => {
    logout();
  };
  return (
    <SafeAreaView style={CommonStyles.container}>
      <Text style={CommonStyles.title}>Welcome, {user.name || user.email}</Text>

      <Text style={CommonStyles.subtitle}>Quick actions</Text>

      <View style={styles.actions}>
        <TouchableOpacity
          style={CommonStyles.card}
          onPress={() => navigation.navigate('Wallet')}
        >
          <Text style={CommonStyles.cardTitle}>Wallet</Text>
          <Text style={[CommonStyles.cardTitle, styles.customCardTitle]}>
            Check balances & currencies
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={CommonStyles.card}
          onPress={() => navigation.navigate('History')}
        >
          <Text style={CommonStyles.cardTitle}>History</Text>
          <Text style={[CommonStyles.cardTitle, styles.customCardTitle]}>
            View your transactions
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={CommonStyles.card}
          onPress={() => navigation.navigate('ExchangeRate')}
        >
          <Text style={CommonStyles.cardTitle}>Exchange Rate</Text>
          <Text style={[CommonStyles.cardTitle, styles.customCardTitle]}>
            Check exchange rates
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[CommonStyles.card, styles.logoutCard]}
          onPress={handleLogout}
        >
          <Text style={[CommonStyles.cardTitle, styles.customLogoutText]}>
            Logout
          </Text>
        </TouchableOpacity>
      </View>
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
