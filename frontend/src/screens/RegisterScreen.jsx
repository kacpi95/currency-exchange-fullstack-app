import { useState } from 'react';
import {
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Pressable,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, Feather } from '@expo/vector-icons';
import { api } from '../api/api';
import CommonStyles from '../styles/common';

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [secure, setSecure] = useState(true);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password) {
      Alert.alert('Complete all fields');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'The password must have at least 6 characters');
      return;
    }

    if (!acceptedTerms) {
      Alert.alert(
        'Error',
        'You must accept the Terms of Service and Privacy Policy',
      );
      return;
    }

    try {
      setLoading(true);
      await api.post('/user/register', { name, email, password });
      Alert.alert('Success', 'Registration completed, you can log in');
      navigation.navigate('Login');
    } catch (err) {
      console.log(err.response?.data || err.message);
      Alert.alert(
        'Registration error',
        err.response?.data?.message || 'Something went wrong!',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={CommonStyles.registerScreen}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={CommonStyles.registerScrollContent}
      >
        <View style={CommonStyles.registerContent}>
          <Text style={CommonStyles.registerTitle}>Create Account</Text>
          <Text style={CommonStyles.registerSubtitle}>
            Join the elite exchange network today.
          </Text>

          <View style={CommonStyles.fieldBlock}>
            <Text style={CommonStyles.fieldLabel}>Full Name</Text>
            <TextInput
              style={CommonStyles.lineInput}
              placeholder='Anna Nowak'
              placeholderTextColor='#3B3F46'
              value={name}
              onChangeText={setName}
            />
          </View>

          <View style={CommonStyles.fieldBlock}>
            <Text style={CommonStyles.fieldLabel}>Email Address</Text>
            <TextInput
              style={CommonStyles.lineInput}
              placeholder='name@gmail.com'
              placeholderTextColor='#3B3F46'
              keyboardType='email-address'
              autoCapitalize='none'
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View style={CommonStyles.fieldBlock}>
            <Text style={CommonStyles.fieldLabel}>Password</Text>

            <View style={CommonStyles.passwordRow}>
              <TextInput
                style={CommonStyles.passwordInput}
                placeholder='••••••••'
                placeholderTextColor='#3B3F46'
                secureTextEntry={secure}
                value={password}
                onChangeText={setPassword}
              />

              <TouchableOpacity onPress={() => setSecure(!secure)}>
                <Feather
                  name={secure ? 'eye-off' : 'eye'}
                  size={20}
                  color='#6B7280'
                />
              </TouchableOpacity>
            </View>
          </View>

          <Pressable
            style={CommonStyles.checkboxRow}
            onPress={() => setAcceptedTerms(!acceptedTerms)}
          >
            <View
              style={[
                CommonStyles.checkbox,
                acceptedTerms && CommonStyles.checkboxActive,
              ]}
            >
              {acceptedTerms && (
                <Ionicons name='checkmark' size={14} color='#08110D' />
              )}
            </View>

            <Text style={CommonStyles.checkboxText}>
              I agree to the
              <Text style={CommonStyles.checkboxLink}>Terms of Service</Text>
              and <Text style={CommonStyles.checkboxLink}>Privacy Policy</Text>.
            </Text>
          </Pressable>

          <TouchableOpacity
            style={[CommonStyles.registerButton, loading && { opacity: 0.7 }]}
            onPress={handleRegister}
            disabled={loading}
          >
            <Text style={CommonStyles.registerButtonText}>
              {loading ? 'Loading...' : 'Register'}
            </Text>
            {!loading && (
              <Ionicons name='arrow-forward' size={22} color='#08110D' />
            )}
          </TouchableOpacity>

          <View style={CommonStyles.loginRow}>
            <Text style={CommonStyles.loginText}>Already have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={CommonStyles.loginLink}>Log in</Text>
            </TouchableOpacity>
          </View>

          <View style={CommonStyles.featureRow}>
            <View style={CommonStyles.featureCard}>
              <Ionicons name='shield-checkmark' size={20} color='#71F5B4' />
              <Text style={CommonStyles.featureLabel}>SECURE</Text>
              <Text style={CommonStyles.featureTitle}>AES-256 Vault</Text>
            </View>

            <View style={CommonStyles.featureCard}>
              <Ionicons name='flash' size={20} color='#71F5B4' />
              <Text style={CommonStyles.featureLabel}>FAST</Text>
              <Text style={CommonStyles.featureTitle}>Zero-latency</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
