import { useContext, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  View,
  Pressable,
  ScrollView,
} from 'react-native';
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';

import CommonStyles from '../styles/common';
import { AuthContext } from '../context/AuthContext';
import { api } from '../api/api';
import ScreenHeader from '../components/ScreenHeader';

export default function LoginScreen({ navigation }) {
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [secure, setSecure] = useState(true);
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Fill in all fields');
      return;
    }

    try {
      setLoading(true);
      const res = await api.post('/user/login', { email, password });
      login(res.data.user, res.data.token);
    } catch (err) {
      console.log(err.response?.data || err.message);
      Alert.alert(
        'Login error',
        err.response?.data?.message || 'Something went wrong!',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={CommonStyles.registerScreen}>
      <ScreenHeader title='Login' showBack={false} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={CommonStyles.registerScrollContent}
      >
        <View style={CommonStyles.loginHeaderIconWrap}>
          <View style={CommonStyles.loginHeaderIconBox}>
            <MaterialCommunityIcons
              name='swap-horizontal-circle-outline'
              size={44}
              color='#2BFF9E'
            />
          </View>
        </View>

        <View style={CommonStyles.loginContent}>
          <Text style={CommonStyles.authTitleCenter}>Login</Text>
          <Text style={CommonStyles.authSubtitleCenter}>
            Enter your credentials to access your digital exchange portal.
          </Text>

          <View style={CommonStyles.fieldBlock}>
            <Text style={CommonStyles.fieldLabel}>EMAIL ADDRESS</Text>

            <View style={CommonStyles.iconInputRow}>
              <Feather name='mail' size={20} color='#7C8591' />
              <TextInput
                style={CommonStyles.iconInput}
                placeholder='name@gmail.com'
                placeholderTextColor='#3B3F46'
                keyboardType='email-address'
                autoCapitalize='none'
                value={email}
                onChangeText={setEmail}
              />
            </View>
          </View>

          <View style={CommonStyles.fieldBlock}>
            <Text style={CommonStyles.fieldLabel}>PASSWORD</Text>

            <View style={CommonStyles.iconInputRow}>
              <Feather name='lock' size={20} color='#7C8591' />
              <TextInput
                style={CommonStyles.iconInput}
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
                  color='#7C8591'
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={CommonStyles.loginOptionsRow}>
            <Pressable
              style={CommonStyles.rememberRow}
              onPress={() => setRememberMe(!rememberMe)}
            >
              <View
                style={[
                  CommonStyles.checkbox,
                  rememberMe && CommonStyles.checkboxActive,
                ]}
              >
                {rememberMe && (
                  <Ionicons name='checkmark' size={14} color='#08110D' />
                )}
              </View>
              <Text style={CommonStyles.rememberText}>Remember me</Text>
            </Pressable>

            <TouchableOpacity>
              <Text style={CommonStyles.forgotText}>Forgot password?</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[CommonStyles.registerButton, loading && { opacity: 0.7 }]}
            onPress={handleLogin}
            disabled={loading}
          >
            <Text style={CommonStyles.registerButtonText}>
              {loading ? 'Loading...' : 'Log In'}
            </Text>
          </TouchableOpacity>

          <View style={CommonStyles.dividerRow}>
            <View style={CommonStyles.dividerLine} />
            <Text style={CommonStyles.dividerText}>OR SECURE CONNECT</Text>
            <View style={CommonStyles.dividerLine} />
          </View>

          <View style={CommonStyles.socialRow}>
            <TouchableOpacity style={CommonStyles.socialButton}>
              <Feather name='chrome' size={18} color='#FFFFFF' />
              <Text style={CommonStyles.socialButtonText}>Google</Text>
            </TouchableOpacity>

            <TouchableOpacity style={CommonStyles.socialButton}>
              <Ionicons name='finger-print-outline' size={20} color='#FFFFFF' />
              <Text style={CommonStyles.socialButtonText}>Biometric</Text>
            </TouchableOpacity>
          </View>

          <View style={CommonStyles.loginRow}>
            <Text style={CommonStyles.loginText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={CommonStyles.loginLink}>Register</Text>
            </TouchableOpacity>
          </View>

          <Text style={CommonStyles.bottomSecurityText}>
            SECURE ENCRYPTION ACTIVE
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
