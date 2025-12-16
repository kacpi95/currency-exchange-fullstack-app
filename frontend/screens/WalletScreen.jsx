import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { ActivityIndicator, StyleSheet, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const { token } = useContext(AuthContext);
  const [wallet, setWallet] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchWallet = async () => {
      try {
        const res = await axios.get('/api/wallet', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setWallet(res.data);
      } catch (err) {
        console.log(object);
        console.log('Wallet error:', err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWallet();
  }, []);
  if (loading || !wallet) {
    return <ActivityIndicator size='large' />;
  }
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Your wallet</Text>
      <View style={styles.cardContainer}>
        <Text style={styles.card}>PLN: {wallet.balance.PLN}</Text>
        <Text style={styles.card}>USD: {wallet.balance.USD}</Text>
        <Text style={styles.card}>EUR: {wallet.balance.EUR}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
