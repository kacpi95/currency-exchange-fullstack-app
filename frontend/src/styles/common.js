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
    backgroundColor: Colors.backgroundWhite,
    color: Colors.textPrimary,
  },

  button: {
    width: '100%',
    maxWidth: 300,
    alignItems: 'center',
    marginTop: Spacing.md,
    padding: Spacing.lg,
    borderRadius: Spacing.sm,
    backgroundColor: Colors.textPrimary,
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

  registerScreen: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 8,
    backgroundColor: Colors.backgroundDefault,
  },

  registerContent: {
    flex: 1,
  },

  registerTitle: {
    marginBottom: 10,
    fontSize: 46,
    lineHeight: 52,
    fontWeight: '800',
    color: Colors.textPrimary,
  },

  registerSubtitle: {
    marginBottom: 42,
    fontSize: 20,
    lineHeight: 28,
    color: '#B0B7C3',
  },

  fieldBlock: {
    marginBottom: 28,
  },

  fieldLabel: {
    marginBottom: 10,
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 1.5,
    color: '#7C8591',
  },

  lineInput: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderDefault,
    fontSize: 17,
    color: Colors.textPrimary,
  },

  passwordRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderDefault,
  },

  passwordInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 17,
    color: Colors.textPrimary,
  },

  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 8,
    marginBottom: 34,
  },

  checkbox: {
    width: 22,
    height: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    marginTop: 2,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.borderDefault,
    backgroundColor: '#11161B',
  },

  checkboxActive: {
    backgroundColor: Colors.accent,
    borderColor: Colors.accent,
  },

  checkboxText: {
    flex: 1,
    fontSize: 15,
    lineHeight: 24,
    color: Colors.textPrimary,
  },

  checkboxLink: {
    color: Colors.accent,
    fontWeight: '600',
  },

  registerButton: {
    height: 58,
    marginBottom: 34,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 10,
    elevation: 8,
    borderRadius: 16,
    backgroundColor: Colors.accent,
  },

  registerButtonText: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.darkText,
  },

  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 42,
  },

  loginText: {
    fontSize: 16,
    color: '#B0B7C3',
  },

  loginLink: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.accent,
  },

  featureRow: {
    flexDirection: 'row',
    gap: 14,
    marginTop: 'auto',
    marginBottom: 20,
  },

  featureCard: {
    flex: 1,
    minHeight: 110,
    padding: 16,
    justifyContent: 'flex-end',
    borderRadius: 18,
    backgroundColor: '#0C1217',
  },

  featureLabel: {
    marginTop: 16,
    marginBottom: 6,
    letterSpacing: 1,
    fontSize: 12,
    fontWeight: '700',
    color: '#7C8591',
  },

  featureTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.textPrimary,
  },

  registerScrollContent: {
    flexGrow: 1,
    paddingBottom: 30,
  },

  loginHeaderIconWrap: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 24,
  },

  loginHeaderIconBox: {
    width: 96,
    height: 96,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 24,
    backgroundColor: '#171D22',
  },

  loginContent: {
    flexGrow: 1,
  },

  authTitleCenter: {
    textAlign: 'center',
    marginBottom: 14,
    color: Colors.textPrimary,
    lineHeight: 52,
    fontSize: 46,
    fontWeight: '800',
  },

  authSubtitleCenter: {
    paddingHorizontal: 8,
    marginBottom: 38,
    textAlign: 'center',
    fontSize: 18,
    lineHeight: 28,
    color: '#B0B7C3',
  },

  iconInputRow: {
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderDefault,
  },

  iconInput: {
    flex: 1,
    paddingVertical: 6,
    fontSize: 17,
    color: Colors.textPrimary,
  },

  loginOptionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 26,
  },

  rememberRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  rememberText: {
    marginLeft: 10,
    fontSize: 15,
    color: Colors.textPrimary,
  },

  forgotText: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.accent,
  },

  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 26,
    marginTop: 22,
  },

  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#1F2933',
  },

  dividerText: {
    marginHorizontal: 12,
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 2,
    color: '#7C8591',
  },

  socialRow: {
    flexDirection: 'row',
    gap: 14,
    marginBottom: 40,
  },

  socialButton: {
    flex: 1,
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    borderRadius: 16,
    backgroundColor: '#171D22',
  },

  socialButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.textPrimary,
  },

  bottomSecurityText: {
    marginTop: 24,
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 4,
    color: '#4B5563',
  },
});
