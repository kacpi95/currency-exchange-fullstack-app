import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import API from '../api/api';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import CommonStyles from '../styles/common';

export default function LoginScreen({ navigation }) {
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error, fill in all fields');
      return;
    }

    try {
      setLoading(true);
      const res = await API.post('/login', { email, password });
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
    <SafeAreaView style={CommonStyles.container}>
      <ImageBackground
        source={require('../images/bgc-1.jpg')}
        style={StyleSheet.absoluteFill}
      />

      <Text style={CommonStyles.title}>Login</Text>
      <TextInput
        style={CommonStyles.input}
        placeholder='Email'
        keyboardType='email-address'
        autoCapitalize='none'
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={CommonStyles.input}
        placeholder='Password'
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity
        style={CommonStyles.button}
        onPress={handleLogin}
        disabled={loading}
      >
        <Text style={CommonStyles.buttonText}>
          {loading ? 'loading' : 'log in'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={CommonStyles.buttonText}
        onPress={() => navigation.navigate('Register')}
      >
        <Text style={CommonStyles.link}>Don't have an account? Register</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
