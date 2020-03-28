import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import api from "../../services/api";

import "./styles.css";

import logoImg from "../../assets/logo.svg";

export default function() {
	const ongID = localStorage.getItem("ongID");

	const history = useHistory();

	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [value, setValue] = useState("");

	async function handleNewIncident(event) {
		event.preventDefault();

		const data = {
			title,
			description,
			value
		};

		try {
			await api.post("incidents", data, {
				headers: {
					Authorization: ongID
				}
			});

			history.push("/profile");
		} catch (error) {
			alert("error to register new incident, try again.");
		}
	}

	return (
		<div className="newIncidentContainer">
			<div className="content">
				<section>
					<img src={logoImg} alt="logo" />

					<h1>Register new cases</h1>
					<p>
						Describe your text detailed to find some hero to solve
						this.
					</p>
					<Link className="backLink" to="/profile">
						<FiArrowLeft size={16} color="#E02041" />
						Back to home
					</Link>
				</section>

				<form onSubmit={handleNewIncident}>
					<input
						placeholder="Case title"
						value={title}
						onChange={event => setTitle(event.target.value)}
					/>
					<textarea
						placeholder="Description"
						value={description}
						onChange={event => setDescription(event.target.value)}
					/>
					<input
						placeholder="Value in BRL"
						value={value}
						onChange={event => setValue(event.target.value)}
					/>

					<button className="button" type="submit">
						Register
					</button>
				</form>
			</div>
		</div>
	);
}
