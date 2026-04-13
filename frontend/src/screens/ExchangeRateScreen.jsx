import {
	Text,
	View,
	TouchableOpacity,
	StyleSheet,
	ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import CommonStyles from "../styles/common";
import Colors from "../styles/colors";

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
						onPress={() => navigation.navigate("CurrentRates")}
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
						onPress={() => navigation.navigate("HistoricalRates")}
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
	actions: {
		width: "100%",
		gap: Spacing.lg,
		alignItems: "center",
	},
});
