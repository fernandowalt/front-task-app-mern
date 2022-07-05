/** @format */

import { useState } from "react";
import useProject from "../hooks/useProjects";
import { Alert } from "../components/Alert";

export const FormCollaborators = () => {
	const { mostrarAlerta, alert, submitCollaborator } = useProject();
	const [email, setEmail] = useState("");

	const emailChange = e => {
		setEmail(e.target.value);
	};

	const handleSubmit = e => {
		e.preventDefault();
		if (email === "") {
			mostrarAlerta({ msg: "el email es obligatorio", error: true });
			return;
		}

		submitCollaborator(email);
	};

	const { msg } = alert;

	return (
		<form onSubmit={handleSubmit} className="bg-white pt-5 px-5 w-full md:w-1/2 rounded-lg shawow">
			{msg && <Alert alert={alert} />}
			<div className="mb-5">
				<label htmlFor="email" className="text-gray-700 uppercase font-bold text-sm">
					Email Colaborador
				</label>
				<input
					onChange={emailChange}
					id="email"
					type="email"
					className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
					placeholder="Email del Colaborador"
					value={email}
				/>
				<input
					type="submit"
					value="Buscar Colaborador"
					className="w-full bg-sky-600 p-3 rounded-md mt-5 text-white hover:bg-sky-700 transition-colors uppercase font-bold block cursor-pointer"
				/>
			</div>
		</form>
	);
};
