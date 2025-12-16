import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import WalletScreen from '../screens/WalletScreen';
import TransactionScreen from '../screens/TransactionScreen';

export default function AppNavigator() {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator>
      <Tab.Screen name='Home' component={HomeScreen} />
      <Tab.Screen name='Wallet' component={WalletScreen} />
      <Tab.Screen name='History' component={TransactionScreen} />
    </Tab.Navigator>
  );
}
