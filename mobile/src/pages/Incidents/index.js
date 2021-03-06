import React, { useState, useEffect } from "react";
import { View, FlatList, Image, Text, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import styles from "./styles";
import logoImg from "../../assets/logo.png";
import api from "../../services/api";

export default function() {
	const navigation = useNavigation();
	const [incidents, setIncidents] = useState([]);
	const [total, setTotal] = useState(0);
	const [page, setPage] = useState(1);
	const [loading, setLoading] = useState(false);

	async function loadIncidents() {
		if (loading) {
			return;
		}

		if (total > 0 && incidents.length === total) {
			return;
		}

		setLoading(true);

		const response = await api.get("incidents", {
			params: { page }
		});

		setIncidents([...incidents, ...response.data]);
		setTotal(response.headers["x-total-count"]);
		setPage(page + 1);
		setLoading(false);
	}

	useEffect(() => {
		loadIncidents();
	}, []);

	function navigateToDetail(incident) {
		navigation.navigate("Detail", { incident });
	}

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Image source={logoImg} />
				<Text style={styles.headerText}>
					Total of{" "}
					<Text style={styles.headerTextBold}>{total} cases</Text>.
				</Text>
			</View>

			<Text style={styles.title}>Welcome!</Text>
			<Text style={styles.description}>
				Select the cases below and save the day.
			</Text>

			<FlatList
				style={styles.incidentList}
				data={incidents}
				keyExtractor={incident => String(incident.id)}
				onEndReached={loadIncidents}
				onEndReachedThreshold={0.2}
				showsVerticalScrollIndicator={false}
				renderItem={({ item: incident }) => (
					<View style={styles.incident}>
						<Text style={styles.incidentProperty}>ONG: </Text>
						<Text style={styles.incidentValue}>
							{incident.name}
						</Text>

						<Text style={styles.incidentProperty}>CASE: </Text>
						<Text style={styles.incidentValue}>
							{incident.title}
						</Text>

						<Text style={styles.incidentProperty}>VALUE: </Text>
						<Text style={styles.incidentValue}>
							{Intl.NumberFormat("pt-Br", {
								style: "currency",
								currency: "BRL"
							}).format(incident.value)}
						</Text>

						<TouchableOpacity
							style={styles.detailsButton}
							onPress={() => navigateToDetail(incident)}
						>
							<Text style={styles.detailsButtonText}>
								See more details
							</Text>
							<Feather
								name="arrow-right"
								size={16}
								color="#e02041"
							/>
						</TouchableOpacity>
					</View>
				)}
			/>
		</View>
	);
}
