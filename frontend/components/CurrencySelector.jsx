import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';

export default function CurrencySelector({ label, value, onSelect }) {
  const currencies = ['PLN', 'USD', 'EUR'];

  return (
    <>
      <Text style={styles.subtitle}>{label}</Text>
      <View style={styles.currencyRow}>
        {currencies.map((cur) => (
          <TouchableOpacity
            key={cur}
            style={[
              styles.currencyButton,
              value === cur && styles.currencyActive,
            ]}
            onPress={() => onSelect(cur)}
          >
            <Text
              style={[
                styles.currencyText,
                value === cur && styles.currencyTextActive,
              ]}
            >
              {cur}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </>
  );
}

const styles = StyleSheet.create({});
