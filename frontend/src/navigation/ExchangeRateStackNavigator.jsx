import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ExchangeRateScreen from '../screens/ExchangeRateScreen';
import CurrentRatesScreen from '../screens/CurrentRatesScreen';
import HistoricalRateScreen from '../screens/HistoricalRatesScreen';

const ExchangeRateStack = createNativeStackNavigator();

export default function ExchangeRateStackNavigator() {
  return (
    <ExchangeRateStack.Navigator>
      <ExchangeRateStack.Screen
        name='ExchangeRate'
        component={ExchangeRateScreen}
        options={{ title: 'Exchange rate' }}
      />
      <ExchangeRateStack.Screen
        name='CurrentRates'
        component={CurrentRatesScreen}
        options={{ title: 'Current Rates' }}
      />
      <ExchangeRateStack.Screen
        name='HistoricalRates'
        component={HistoricalRateScreen}
        options={{ title: 'Historical Rates' }}
      />
    </ExchangeRateStack.Navigator>
  );
}
