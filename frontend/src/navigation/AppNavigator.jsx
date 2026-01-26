import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import TransactionScreen from '../screens/TransactionScreen';
import WalletStackNavigator from './WalletStackNavigator';
import ExchangeRateStackNavigator from './ExchangeRateStackNavigator';
import Colors from '../styles/colors';

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Wallet') {
            iconName = focused ? 'wallet' : 'wallet-outline';
          } else if (route.name === 'History') {
            iconName = focused ? 'list' : 'list-outline';
          } else if (route.name === 'ExchangeRate') {
            iconName = focused ? 'trending-up' : 'trending-up-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: Colors.backgroundDefault,
        tabBarInactiveTintColor: Colors.textTertiary,
      })}
    >
      <Tab.Screen
        name='Home'
        component={HomeScreen}
        options={{ headerShown: false, title: 'Home' }}
      />
      <Tab.Screen
        name='Wallet'
        component={WalletStackNavigator}
        options={{ headerShown: false }}
      />
      <Tab.Screen name='History' component={TransactionScreen} />
      <Tab.Screen
        name='ExchangeRate'
        component={ExchangeRateStackNavigator}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}
