import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import WalletScreen from '../screens/WalletScreen';
import TransactionScreen from '../screens/TransactionScreen';
import TransactionFormScreen from '../screens/TransactionFormScreen';
import DepositScreen from '../screens/DepositScreen';
import CurrentRatesScreen from '../screens/CurrentRatesScreen';
import HistoricalRateScreen from '../screens/HistoricalRatesScreen';

export default function AppNavigator() {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator>
      <Tab.Screen name='Home' component={HomeScreen} />
      <Tab.Screen name='Wallet' component={WalletScreen} />
      <Tab.Screen name='History' component={TransactionScreen} />
      <Tab.Screen name='Transaction' component={TransactionFormScreen} />
      <Tab.Screen name='Deposit' component={DepositScreen} />
      <Tab.Screen name='Current' component={CurrentRatesScreen} />
      <Tab.Screen name='Old Currency' component={HistoricalRateScreen} />
    </Tab.Navigator>
  );
}
