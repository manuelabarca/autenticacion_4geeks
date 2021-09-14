import React, { useEffect, useState, useContext } from "react";
import { Context } from "../store/appContext";
const Register = () => {
	const { store, actions } = useContext(Context);

	const [countries, setCountries] = useState([]);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [country, setCountry] = useState("");

	useEffect(
		() => {
			fetch("https://restcountries.eu/rest/v2/all")
				.then(resp => {
					if (resp.ok) {
						return resp.json();
					}
				})
				.then(data => setCountries(data))
				.catch(error => console.error("[ERROR GET COUNTRIES]", error));
		},
		[countries]
	);

	const register = () => {
		actions.register(email, password, country);
		setEmail("");
		setPassword("");
	};

	return (
		<div className="text-center mt-5">
			<h1>Registrarse</h1>
			<div className="container">
				<input
					type="email"
					value={email}
					onChange={e => setEmail(e.target.value)}
					placeholder="Ingresar correo electronico"
				/>
				<input
					type="password"
					value={password}
					onChange={e => setPassword(e.target.value)}
					placeholder="Ingresar contraseña"
				/>
				<select value={country} onChange={e => setCountry(e.target.value)}>
					{countries.map(item => (
						<option key={item.alpha2Code} value={item.alpha2Code}>
							{item.name}
						</option>
					))}
				</select>
				<button onClick={() => register()}>Registrarse</button>
			</div>
		</div>
	);
};

export default Register;
