import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CommonStyles from '../styles/common';
import Spacing from '../styles/spacing';

export default function ExchangeRateScreen({ navigation }) {
  return (
    <SafeAreaView style={CommonStyles.container}>
      <Text style={CommonStyles.title}>Exchange Rate</Text>

      <View style={styles.actions}>
        <TouchableOpacity
          style={CommonStyles.card}
          onPress={() => navigation.navigate('CurrentRates')}
        >
          <Text style={CommonStyles.cardTitle}>Current exchange rates</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={CommonStyles.card}
          onPress={() => navigation.navigate('HistoricalRates')}
        >
          <Text style={CommonStyles.cardTitle}>Historical exchange rates</Text>
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
});
