import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import API from '../api/api';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';

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
        err.response?.data?.message || 'Something went wrong!'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder='Email'
        keyboardType='email-address'
        autoCapitalize='none'
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder='Password'
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
        disabled={loading}
      >
        <Text style={styles.buttonText}>{loading ? 'loading' : 'log in'}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonText}
        onPress={() => navigation.navigate('Register')}
      >
        <Text style={styles.link}>Don't have an account? Register</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#e8f7f2',
  },
  title: {
    marginBottom: 20,
    fontWeight: '700',
    fontSize: 28,
    color: '#05668d',
  },
  input: {
    width: '100%',
    marginBottom: 15,
    padding: 10,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: '#a3d2ca',
    backgroundColor: '#fff',
  },
  button: {
    width: '100%',
    padding: 15,
    alignItems: 'center',
    borderRadius: 6,
    backgroundColor: '#028090',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  link: {
    marginTop: 15,
    color: '#05668d',
  },
});
