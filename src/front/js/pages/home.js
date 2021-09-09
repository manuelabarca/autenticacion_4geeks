import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.scss";

export const Home = () => {
	const { store, actions } = useContext(Context);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const login = () => {
		actions.login(email, password);
		setEmail("");
		setPassword("");
	};

	return (
		<div className="text-center mt-5">
			{store.isAuthenticate ? (
				<h1>Bienvenido</h1>
			) : (
				<>
					<input
						type="email"
						placeholder="Ingresar correo electronico"
						value={email}
						onChange={e => setEmail(e.target.value)}
					/>
					<input
						type="password"
						placeholder="Ingresar contraseña"
						value={password}
						onChange={e => setPassword(e.target.value)}
					/>
					<button onClick={() => login()}>Entrar</button>
				</>
			)}
		</div>
	);
};
