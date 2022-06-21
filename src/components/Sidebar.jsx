/** @format */

import React from "react";
import { Link } from "react-router-dom";
import useAunt from "../hooks/useAuth";

export const Sidebar = () => {
	const { auth } = useAunt();
	const { name } = auth;
	return (
		<aside className="md:w-80 lg:w-96 px-5 py-10">
			<p className="text-xl font-bold">Hola: {name}</p>
			<Link to="create-project" className="bg-sky-600 w-full p-3 text-white uppercase font-bold block mt-5 text-center rounded-md">
				Crear Proyecto
			</Link>
		</aside>
	);
};
