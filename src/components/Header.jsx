/** @format */

import React from "react";
import { Link } from "react-router-dom";
import useProjects from "../hooks/useProjects";
import useAuth from "../hooks/useAuth";
import Searcher from "./Searcher";

export const Header = () => {
	const { handleSearcher, cerrarSesionProyectos } = useProjects();
	const { cerrarSesionAuth } = useAuth();

	const handleCloseSesion = () => {
		cerrarSesionProyectos();
		cerrarSesionAuth();
		localStorage.removeItem("token");
	};
	return (
		<header className="px-4 py-5 bg-white border-b">
			<div className="md:flex md:justify-between">
				<h2 className="text-4xl text-sky-600 font-black text-center mb-5 mb:mb-0">UPTask</h2>

				<div className="flex flex-col md:flex-row items-center gap-4">
					<button type="button" className="font-bold uppercase" onClick={handleSearcher}>
						Buscar Proyecto
					</button>
					<Link to="/projects" className="font-bold uppercase">
						proyectos
					</Link>
					<button onClick={handleCloseSesion} className="text-white text-sm bg-sky-600 p-3 rounded-md uppercase font-bold">
						Cerrar Sesion
					</button>
					<Searcher />
				</div>
			</div>
		</header>
	);
};
