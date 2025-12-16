import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/WalletScreen';
import WalletScreen from '../screens/WalletScreen';

export default function AppNavigator() {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator>
      {/* <Tab.Screen name='Home' component={HomeScreen} /> */}
      <Tab.Screen name='Wallet' component={WalletScreen} />
      {/* <Tab.Screen name='History' component={TransactionsScreen} /> */}
    </Tab.Navigator>
  );
}
