import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import Colors from '../styles/colors';

export default function ScreenHeader({ title, showBack = true, rightElement }) {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <View style={styles.leftSide}>
        {showBack ? (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Ionicons name='arrow-back' size={22} color={Colors.accent} />
          </TouchableOpacity>
        ) : (
          <View style={styles.placeholder} />
        )}

        <Text style={styles.title}>{title}</Text>
      </View>

      <View style={styles.rightSide}>
        {rightElement ? rightElement : <View style={styles.placeholder} />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    minHeight: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },

  leftSide: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  rightSide: {
    minWidth: 32,
    alignItems: 'flex-end',
  },

  backButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },

  placeholder: {
    width: 32,
    height: 32,
  },

  title: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
});
