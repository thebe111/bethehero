import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiPower, FiTrash2 } from "react-icons/fi";
import api from "../../services/api";

import "./styles.css";

import logoImg from "../../assets/logo.svg";

export default function() {
	const [incidents, setIncidents] = useState([]);

	const ongID = localStorage.getItem("ongID");
	const ongName = localStorage.getItem("ongName");

	const history = useHistory();

	async function handleDeleteIncident(id) {
		try {
			await api.delete(`incidents/${id}`, {
				headers: {
					Authorization: ongID
				}
			});
		} catch (error) {
			alert("Error to delete incident, try again.");
		}

		setIncidents(incidents.filter(incident => incident.id !== id));
	}

	function handleLogout() {
		localStorage.clear();

		history.push("/");
	}

	useEffect(() => {
		(async () => {
			const response = await api.get("/profile", {
				headers: {
					Authorization: ongID
				}
			});
			setIncidents(response.data);
		})();
	}, [ongID]);

	return (
		<div className="profileContainer">
			<header>
				<img src={logoImg} alt="logo" />
				<span>Welcome, {ongName}</span>

				<Link className="button" to="/incidents/new">
					Register new cases
				</Link>
				<button type="button" onClick={handleLogout}>
					<FiPower size={18} color="#E02041" />
				</button>
			</header>

			<h1>Registered cases</h1>

			<ul>
				{incidents.map(incident => (
					<li key={incident.id}>
						<strong>CASE:</strong>
						<p>{incident.title}</p>

						<strong>DESCRIPTION:</strong>
						<p>{incident.description}</p>

						<strong>VALUE:</strong>
						<p>
							{Intl.NumberFormat("pt-BR", {
								style: "currency",
								currency: "BRL"
							}).format(incident.value)}
						</p>

						<button
							type="button"
							onClick={() => handleDeleteIncident(incident.id)}
						>
							<FiTrash2 size={20} color="#A8A8B3" />
						</button>
					</li>
				))}
			</ul>
		</div>
	);
}
