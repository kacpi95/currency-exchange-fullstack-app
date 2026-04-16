import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import HomeScreen from '../screens/HomeScreen';
import TransactionScreen from '../screens/TransactionScreen';
import WalletStackNavigator from './WalletStackNavigator';
import ExchangeRateStackNavigator from './ExchangeRateStackNavigator';
import Colors from '../styles/colors';

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size, focused }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Wallet') {
            iconName = focused ? 'wallet' : 'wallet-outline';
          } else if (route.name === 'History') {
            iconName = focused ? 'list' : 'list-outline';
          } else if (route.name === 'Rates') {
            iconName = focused ? 'trending-up' : 'trending-up-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: Colors.accent,
        tabBarInactiveTintColor: Colors.textTertiary,
        tabBarStyle: {
          backgroundColor: '#0B1115',
          borderTopColor: '#1A232C',
          borderTopWidth: 1,
          height: 60 + insets.bottom,
          paddingTop: 8,
          paddingBottom: insets.bottom > 0 ? insets.bottom : 8,
        },
        tabBarItemStyle: {
          paddingVertical: 4,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      })}
    >
      <Tab.Screen
        name='Home'
        component={HomeScreen}
        options={{ title: 'Home' }}
      />
      <Tab.Screen
        name='Wallet'
        component={WalletStackNavigator}
        options={{ title: 'Wallet' }}
      />
      <Tab.Screen
        name='History'
        component={TransactionScreen}
        options={{ title: 'History' }}
      />
      <Tab.Screen
        name='Rates'
        component={ExchangeRateStackNavigator}
        options={{ title: 'Rates' }}
      />
    </Tab.Navigator>
  );
}
