import { NavigationContainer } from '@react-navigation/native';
import { ActivityIndicator, SafeAreaView, StyleSheet } from 'react-native';
import { useContext } from 'react';
import { AuthContext, AuthProvider } from './src/context/AuthContext';
import AppNavigator from './src/navigation/AppNavigator';
import AuthNavigator from './src/navigation/AuthNavigator';

const RootNavigator = () => {
  const { token, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size='large' />
      </SafeAreaView>
    );
  }

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

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
