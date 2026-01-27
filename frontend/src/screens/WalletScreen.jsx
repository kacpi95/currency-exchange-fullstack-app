import { useCallback, useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import {
  ActivityIndicator,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import CommonStyles from '../styles/common';
import { api } from '../api/api';

export default function WalletScreen({ navigation }) {
  const { token } = useContext(AuthContext);
  const [wallet, setWallet] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchWallet = async () => {
    try {
      const res = await api.get('/wallet', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setWallet(res.data);
    } catch (err) {
      console.log(err);
      console.log('Wallet error:', err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchWallet();
    }, []),
  );


  if (loading || !wallet) {
    return (
      <SafeAreaView style={CommonStyles.container}>
        <ActivityIndicator size='large' color='#028090' />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={CommonStyles.container}>
      <Text style={CommonStyles.title}>Your wallet</Text>

      <View style={CommonStyles.cardContainer}>
        <View style={CommonStyles.card}>
          <Text style={CommonStyles.cardTitle}>PLN</Text>
          <Text style={CommonStyles.cardTitle}>{wallet.balance.PLN}</Text>
        </View>

        <View style={CommonStyles.card}>
          <Text style={CommonStyles.cardTitle}>USD</Text>
          <Text style={CommonStyles.cardTitle}>{wallet.balance.USD}</Text>
        </View>

        <View style={CommonStyles.card}>
          <Text style={CommonStyles.cardTitle}>EUR</Text>
          <Text style={CommonStyles.cardTitle}>{wallet.balance.EUR}</Text>
        </View>
      </View>
      <TouchableOpacity
        style={[CommonStyles.button, styles.customButton]}
        onPress={() => navigation.navigate('MakeTransaction')}
      >
        <Text style={CommonStyles.buttonText}>Make Transaction</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[CommonStyles.button, styles.customButton]}
        onPress={() => navigation.navigate('Deposit')}
      >
        <Text style={CommonStyles.buttonText}>Deposit PLN</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  customButton: {
    maxWidth: 360,
  },
});
