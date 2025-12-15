import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import API from '../api/api';

export default function LoginScreen() {
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

  return;
}
