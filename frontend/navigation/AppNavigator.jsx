import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import WalletScreen from '../screens/WalletScreen';
import TransactionScreen from '../screens/TransactionScreen';
import TransactionFormScreen from '../screens/TransactionFormScreen';
import DepositScreen from '../screens/DepositScreen';
import CurrentRatesScreen from '../screens/CurrentRatesScreen';
import HistoricalRateScreen from '../screens/HistoricalRatesScreen';
import WalletStackNavigator from './WalletStackNavigator';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='HomeMain'
        component={HomeScreen}
        options={{ title: 'Home' }}
      />
      <Stack.Screen
        name='CurrentRates'
        component={CurrentRatesScreen}
        options={{ title: 'Current Rates' }}
      />
      <Stack.Screen
        name='HistoricalRates'
        component={HistoricalRateScreen}
        options={{ title: 'Historical Rates' }}
      />
    </Stack.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name='HomeStack'
        component={HomeStack}
        options={{ headerShown: false, title: 'Home' }}
      />
      <Tab.Screen
        name='Wallet'
        component={WalletStackNavigator}
        options={{ headerShown: false }}
      />
      <Tab.Screen name='History' component={TransactionScreen} />
    </Tab.Navigator>
  );
}
