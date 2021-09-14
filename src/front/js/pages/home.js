import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.scss";

export const Home = () => {
	const { store, actions } = useContext(Context);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showForgotPassword, setShowForgotPassword] = useState(false);
	const [emailForgot, setEmailForgot] = useState("");

	const login = () => {
		actions.login(email, password);
		setEmail("");
		setPassword("");
	};

	const forgotPassword = () => {
		actions.forgotPassword(emailForgot);
		setEmailForgot("");
		setShowForgotPassword(!showForgotPassword);
	};

	useEffect(() => {
		if (store.message !== null) {
			alert(store.message);
		}
	}, store.message);

	return (
		<div className="text-center mt-5">
			{showForgotPassword ? (
				<>
					<input
						type="email"
						placeholder="Ingresar correo electronico"
						value={emailForgot}
						onChange={e => setEmailForgot(e.target.value)}
					/>
					<button onClick={() => forgotPassword()}>Recuperar contraseña</button>
					<p style={{ cursor: "pointer" }} onClick={() => setShowForgotPassword(!showForgotPassword)}>
						Iniciar sesión
					</p>
				</>
			) : store.isAuthenticate ? (
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
					<p style={{ cursor: "pointer" }} onClick={() => setShowForgotPassword(!showForgotPassword)}>
						Recuperar contraseña
					</p>
				</>
			)}
		</div>
	);
};
