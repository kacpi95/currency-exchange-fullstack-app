import { createNativeStackNavigator } from '@react-navigation/native-stack';

import WalletScreen from '../screens/WalletScreen';
import TransactionFormScreen from '../screens/TransactionFormScreen';
import TransactionScreen from '../screens/TransactionScreen';
import DepositScreen from '../screens/DepositScreen';

const WalletStack = createNativeStackNavigator();

export default function WalletStackNavigator() {
  return (
    <WalletStack.Navigator>
      <WalletStack.Screen
        name='WalletMain'
        component={WalletScreen}
        options={{ title: 'Wallet' }}
      />
      <WalletStack.Screen
        name='MakeTransaction'
        component={TransactionFormScreen}
        options={{ title: 'New Transaction' }}
      />
      <WalletStack.Screen
        name='TransactionHistory'
        component={TransactionScreen}
        options={{ title: 'History' }}
      />
      <WalletStack.Screen
        name='Deposit'
        component={DepositScreen}
        options={{ title: 'Deposit' }}
      />
    </WalletStack.Navigator>
  );
}
