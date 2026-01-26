import { StyleSheet } from 'react-native';
import Colors from './colors';
import Spacing from './spacing';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xl,
    backgroundColor: Colors.backgroundDefault,
  },

  title: {
    marginBottom: Spacing.xxl,
    fontSize: Spacing.xxxl,
    fontWeight: '700',
    color: Colors.textPrimary,
  },

  input: {
    width: '100%',
    maxWidth: 300,
    marginBottom: Spacing.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderRadius: Spacing.sm,
    fontSize: Spacing.lg,
    borderColor: Colors.borderDefault,
    backgroundColor: Colors.textPrimary,
  },

  button: {
    width: '100%',
    maxWidth: 300,
    alignItems: 'center',
    marginTop: Spacing.md,
    padding: Spacing.lg,
    borderRadius: Spacing.sm,
    backgroundColor: Colors.textSecondary,
  },

  buttonText: {
    fontSize: Spacing.lg,
    fontWeight: '600',
    color: Colors.backgroundWhite,
  },

  link: {
    marginTop: Spacing.lg,
    fontSize: Spacing.lg,
    color: Colors.textPrimary,
  },

  subtitle: {
    marginBottom: Spacing.lg,
    marginTop: Spacing.sm,
    textAlign: 'center',
    fontSize: Spacing.lg,
    color: Colors.textSecondary,
  },

  cardContainer: {
    width: '100%',
    gap: Spacing.lg,
    marginBottom: Spacing.xl,
    alignItems: 'center',
  },

  card: {
    width: '100%',
    maxWidth: 360,
    alignItems: 'center',
    padding: Spacing.xl,
    borderRadius: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.borderDefault,
    backgroundColor: Colors.backgroundWhite,
  },

  cardTitle: {
    marginBottom: 6,
    textAlign: 'center',
    fontSize: Spacing.xl,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
});
