import { useCallback, useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import WalletApi from '../api/wallet';
import { ActivityIndicator, View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import CommonStyles from '../styles/common';

export default function WalletScreen({ navigation }) {
  const { token } = useContext(AuthContext);
  const [wallet, setWallet] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchWallet = async () => {
    try {
      const res = await WalletApi.get('/', {
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
    }, [])
  );

  useEffect(() => {
    fetchWallet();
  }, []);

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
        style={CommonStyles.button}
        onPress={() => navigation.navigate('MakeTransaction')}
      >
        <Text style={CommonStyles.buttonText}>Make Transaction</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={CommonStyles.button}
        onPress={() => navigation.navigate('TransactionHistory')}
      >
        <Text style={CommonStyles.buttonText}>Transaction History</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={CommonStyles.button}
        onPress={() => navigation.navigate('Deposit')}
      >
        <Text style={CommonStyles.buttonText}>Deposit PLN</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
