import {
	Text,
	View,
	TouchableOpacity,
	StyleSheet,
	ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import CommonStyles from '../styles/common';
import Colors from '../styles/colors';

export default function ExchangeRateScreen({ navigation }) {
	return (
		<SafeAreaView style={CommonStyles.registerScreen}>
			<ScrollView
				showsVerticalScrollIndicator={false}
				contentContainerStyle={CommonStyles.pagePadding}
			>
				<Text style={CommonStyles.smallLabel}>MARKET DATA</Text>

				<Text style={styles.title}>Exchange Rates</Text>

				<Text style={styles.subtitle}>
					View real-time and historical currency exchange data.
				</Text>

				<View style={styles.cardsContainer}>
					<TouchableOpacity
						style={styles.card}
						onPress={() => navigation.navigate('CurrentRates')}
					>
						<View style={styles.iconBox}>
							<Ionicons name='pulse-outline' size={22} color={Colors.accent} />
						</View>

						<Text style={styles.cardTitle}>Current Rates</Text>
						<Text style={styles.cardSubtitle}>
							Check latest exchange values in real time
						</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={styles.card}
						onPress={() => navigation.navigate('HistoricalRates')}
					>
						<View style={styles.iconBox}>
							<Ionicons name='time-outline' size={22} color={Colors.accent} />
						</View>

						<Text style={styles.cardTitle}>Historical Rates</Text>
						<Text style={styles.cardSubtitle}>
							Analyze past exchange rate trends
						</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	title: {
		marginBottom: 10,
		fontSize: 42,
		fontWeight: '800',
		color: Colors.textPrimary,
	},

	subtitle: {
		marginBottom: 32,
		fontSize: 18,
		lineHeight: 28,
		color: '#A1A9B3',
	},

	cardsContainer: {
		gap: 16,
	},

	card: {
		padding: 20,
		borderWidth: 1,
		borderRadius: 20,
		borderColor: '#1A232C',
		backgroundColor: '#0E1419',
	},

	iconBox: {
		width: 44,
		height: 44,
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: 14,
		borderRadius: 12,
		backgroundColor: 'rgba(43,255,158,0.08)',
	},

	cardTitle: {
		marginBottom: 6,
		fontSize: 22,
		fontWeight: '700',
		color: Colors.textPrimary,
	},

	cardSubtitle: {
		fontSize: 15,
		lineHeight: 22,
		color: '#A5AFBA',
	},
});
