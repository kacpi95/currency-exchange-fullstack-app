import { useState } from 'react';
import { api } from '../api/api';
import { Alert, Text, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CommonStyles from '../styles/common';

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password) {
      Alert.alert('Complete all fields');
      return;
    }
    if (password.length < 6) {
      Alert.alert('Error', 'The password must have at least 6 characters');
      return;
    }

    try {
      setLoading(true);
      await api.post('/user/register', { name, email, password });
      Alert.alert('Registration completed, you can log in');
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
    <SafeAreaView style={CommonStyles.container}>
      <Text style={CommonStyles.title}>Registration</Text>
      <TextInput
        style={CommonStyles.input}
        placeholder='Name'
        value={name}
        onChangeText={setName}
      />
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
      <TouchableOpacity style={CommonStyles.button} onPress={handleRegister}>
        <Text style={CommonStyles.buttonText}>
          {loading ? 'loading' : 'Register'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={CommonStyles.buttonText}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={CommonStyles.link}>Have an account? Log in</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
