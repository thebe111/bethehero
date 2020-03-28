import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import api from "../../services/api";

import "./styles.css";

import logoImg from "../../assets/logo.svg";

export default function() {
	const [ongName, setOngName] = useState("");
	const [email, setEmail] = useState("");
	const [whatsapp, setWhatsapp] = useState("");
	const [city, setCity] = useState("");
	const [UF, setUF] = useState("");

	const history = useHistory();

	async function handleRegister(event) {
		event.preventDefault();

		const data = {
			name: ongName,
			email,
			whatsapp,
			city,
			uf: UF
		};

		try {
			const response = await api.post("ongs", data);

			alert(`Your access ID: ${response.data.id}`);

			history.push("/");
		} catch (error) {
			alert("Error on your registration, try again.");
		}
	}

	return (
		<div className="registerContainer">
			<div className="content">
				<section>
					<img src={logoImg} alt="logo" />

					<h1>Register</h1>
					<p>
						Make your registration, enter in the platform and help
						people to find cases of your ONG.
					</p>
					<Link className="backLink" to="/">
						<FiArrowLeft size={16} color="#E02041" />
						Sign In
					</Link>
				</section>

				<form onSubmit={handleRegister}>
					<input
						placeholder="ONG name"
						value={ongName}
						onChange={event => setOngName(event.target.value)}
					/>
					<input
						type="email"
						placeholder="Email"
						value={email}
						onChange={event => setEmail(event.target.value)}
					/>
					<input
						placeholder="Whatsapp"
						value={whatsapp}
						onChange={event => setWhatsapp(event.target.value)}
					/>

					<div className="inputGroup">
						<input
							placeholder="City"
							value={city}
							onChange={event => setCity(event.target.value)}
						/>
						<input
							placeholder="UF"
							style={{ width: 80 }}
							value={UF}
							onChange={event => setUF(event.target.value)}
						/>
					</div>

					<button className="button" type="submit">
						Sign Up
					</button>
				</form>
			</div>
		</div>
	);
}
