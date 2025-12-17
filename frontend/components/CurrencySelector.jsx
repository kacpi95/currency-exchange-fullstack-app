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

const styles = StyleSheet.create({
  currencyRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 10,
  },
  subtitle: {
    marginBottom: 6,
    marginTop: 12,
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '600',
    color: '#028090',
  },

  currencyButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#a3d2ca',
    backgroundColor: '#fff',
  },

  currencyActive: {
    backgroundColor: '#028090',
    borderColor: '#028090',
  },

  currencyText: {
    fontWeight: '600',
    color: '#05668d',
  },

  currencyTextActive: {
    color: '#fff',
  },
});
