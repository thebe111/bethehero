import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";
import api from "../../services/api";

import "./styles.css";

import logoImg from "../../assets/logo.svg";
import heroesImg from "../../assets/heroes.png";

export default function() {
	const [id, setID] = useState("");

	const history = useHistory();

	async function handleSession(event) {
		event.preventDefault();

		try {
			const response = await api.post("sessions", { id });

			localStorage.setItem("ongID", id);
			localStorage.setItem("ongName", response.data.name);

			history.push("/profile");
		} catch (error) {
			alert("Invalid ID, try again");
			setID("");
		}
	}

	return (
		<>
			<div className="logonContainer">
				<section className="form">
					<img src={logoImg} alt="logo" />
					<form onSubmit={handleSession}>
						<h1>Make your logon</h1>
						<input
							placeholder="your ID"
							value={id}
							onChange={event => setID(event.target.value)}
						/>
						<button className="button" type="submit">
							Sign In
						</button>
						<Link className="backLink" to="/register">
							<FiLogIn size={16} color="#E02041" />I don't have a
							registration
						</Link>
					</form>
				</section>
				<img src={heroesImg} alt="heroes" />
			</div>
		</>
	);
}
