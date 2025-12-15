import { NavigationContainer } from '@react-navigation/native';
import { useContext } from 'react';
import { AuthContext, AuthProvider } from './context/AuthContext';
import AppNavigator from './navigation/AppNavigator';
import AuthNavigator from './navigation/AuthNavigator';

const RootNavigator = () => {
  const { token } = useContext(AuthContext);
  return token ? <AppNavigator /> : <AuthNavigator />;
};

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}
