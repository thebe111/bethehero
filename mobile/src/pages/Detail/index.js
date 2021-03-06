import React from "react";
import {
	View,
	Text,
	TouchableOpacity,
	Image,
	ScrollView,
	SafeAreaView,
	Linking
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as MailComposer from "expo-mail-composer";
import styles from "./styles";
import logoImg from "../../assets/logo.png";

export default function() {
	const navigate = useNavigation();
	const message = "Message to send";
	const route = useRoute();
	const incident = route.params.incident;

	function navigateToHome() {
		navigate.goBack();
	}

	function sendMail() {
		MailComposer.composeAsync({
			subject: "Hero of case: Case title",
			recipients: ["address@mail.com"],
			body: message
		});
	}

	function sendWhatsapp() {
		Linking.openURL(`whatsapp://send?phone=551212341234&text=${message}`);
	}

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Image source={logoImg} />
				<TouchableOpacity onPress={navigateToHome}>
					<Feather name="arrow-left" size={28} color="#e02841" />
				</TouchableOpacity>
			</View>

			<SafeAreaView>
				<ScrollView showsVerticalScrollIndicator={false}>
					<View style={styles.incident}>
						<Text
							style={[styles.incidentProperty, { marginTop: 0 }]}
						>
							ONG:{" "}
						</Text>
						<Text style={styles.incidentValue}>
							{incident.name}
						</Text>

						<Text style={styles.incidentProperty}>CASE: </Text>
						<Text style={styles.incidentValue}>
							{incident.title}
						</Text>

						<Text style={styles.incidentProperty}>
							DESCRIPTION:{" "}
						</Text>
						<Text style={styles.incidentValue}>
							{incident.description}
						</Text>

						<View style={styles.incidentInformation}>
							<View>
								<Text style={styles.incidentProperty}>
									LOCATION:{" "}
								</Text>
								<Text style={styles.incidentValue}>
									{`${incident.city} / ${incident.uf}`}
								</Text>
							</View>

							<View>
								<Text style={styles.incidentProperty}>
									VALUE:{" "}
								</Text>
								<Text style={styles.incidentValue}>
									{Intl.NumberFormat("pt-BR", {
										style: "currency",
										currency: "BRL"
									}).format(incident.value)}
								</Text>
							</View>
						</View>
					</View>

					<View style={styles.contactBox}>
						<Text style={styles.heroTitle}>Save the day</Text>
						<Text style={styles.heroTitle}>
							<Text style={styles.heroTitleSlogan}>
								Be the Hero
							</Text>{" "}
							of this case
						</Text>

						<Text style={styles.heroDescription}>Contact me</Text>

						<View style={styles.actions}>
							<TouchableOpacity
								style={styles.action}
								onPress={sendWhatsapp}
							>
								<Text style={styles.actionText}>Whatsapp</Text>
							</TouchableOpacity>

							<TouchableOpacity
								style={styles.action}
								onPress={sendMail}
							>
								<Text style={styles.actionText}>Email</Text>
							</TouchableOpacity>
						</View>
					</View>
				</ScrollView>
			</SafeAreaView>
		</View>
	);
}
