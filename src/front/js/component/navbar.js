import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
	const { store, actions } = useContext(Context);

	return (
		<nav className="navbar navbar-light bg-light mb-3">
			<Link to="/">
				<span className="navbar-brand mb-0 h1">React Boilerplate</span>
			</Link>
			<div className="ml-auto">
				{store.isAuthenticate ? (
					<button onClick={() => actions.signOut()}>Cerrar sesión</button>
				) : (
					<span className="navbar-item">Iniciar sesión</span>
				)}
			</div>
			<Link to="/register">
				<span className="navbar-item">Registrarse</span>
			</Link>
		</nav>
	);
};
