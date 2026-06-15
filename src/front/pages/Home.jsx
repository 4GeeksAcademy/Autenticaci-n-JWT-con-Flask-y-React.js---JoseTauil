import React from "react";
import { Link } from "react-router-dom";

export const Home = () => {
	return (
		<div className="container text-center mt-5">
			<h1>Autenticación JWT con Flask y React</h1>

			<p>
				Sistema de autenticación con registro, inicio de sesión y rutas protegidas.
			</p>

			<div className="mt-4">
				<Link to="/signup" className="btn btn-primary me-2">
					Registrarse
				</Link>

				<Link to="/login" className="btn btn-success">
					Iniciar sesión
				</Link>
			</div>
		</div>
	);
};