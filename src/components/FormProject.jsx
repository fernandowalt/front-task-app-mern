/** @format */

import { useState, useEffect } from "react";
import useProjects from "../hooks/useProjects";
import { Alert } from "../components/Alert";

export const FormProject = () => {
	const [form, setForm] = useState({ name: "", description: "", dateOfDelivery: "", client: "" });
	const { name, description, dateOfDelivery, client } = form;
	const { mostrarAlerta, alert, submitProject, project, setProject } = useProjects();
	const [id, setId] = useState(null);

	useEffect(() => {
		if (project._id) {
			setId(project._id);

			setForm({
				name: project.name,
				description: project.description,
				dateOfDelivery: project.dateOfDelivery?.split("T")[0],
				client: project.client,
			});
		}

		setForm({
			name: project.name,
			description: project.description,
			dateOfDelivery: project.dateOfDelivery?.split("T")[0],
			client: project.client,
		});
	}, [project.id]);

	const handleSubmit = async e => {
		e.preventDefault();

		if ([name, description, dateOfDelivery, client].includes("")) {
			mostrarAlerta({ msg: "todos los campos son requeridos", error: true });

			return;
		}

		await submitProject({ ...form, id });
		setId(null);
		setForm({ name: "", description: "", dateOfDelivery: "", client: "" });
		setProject({});
	};

	const { msg } = alert;

	return (
		<form onSubmit={handleSubmit} className="bg-white py10 px-5 py-10 md:w-1/2 rounded-lg ">
			{msg && <Alert alert={alert} />}
			<div className="mb-5">
				<label className="text-gray-700 uppercase font-bold text-sm" htmlFor="nombre">
					nombre proyecto
				</label>
				<input
					id="nombre"
					type="text"
					className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md shadow"
					placeholder="Nombre Del Proyecto"
					// value={form.name}
					onChange={e => setForm({ ...form, name: e.target.value })}
					defaultValue={form.name}
				/>
			</div>
			<div className="mb-5">
				<label className="text-gray-700 uppercase font-bold text-sm" htmlFor="descripcion">
					descripción
				</label>
				<textarea
					id="descripcion"
					className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md shadow"
					placeholder="Descripción Del Proyecto"
					// value={form.description}
					onChange={e => setForm({ ...form, description: e.target.value })}
					defaultValue={form.description}

				/>
			</div>
			<div className="mb-5">
				<label className="text-gray-700 uppercase font-bold text-sm" htmlFor="fecha-entrega">
					Fecha de entrega
				</label>
				<input
					id="fecha-entrega"
					type="date"
					className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md shadow"
					// value={form.dateOfDelivery}
					onChange={e => setForm({ ...form, dateOfDelivery: e.target.value })}
					defaultValue={form.dateOfDelivery}

				/>
			</div>
			<div className="mb-5">
				<label className="text-gray-700 uppercase font-bold text-sm" htmlFor="cliente">
					cliente
				</label>
				<input
					id="cliente"
					type="text"
					className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md shadow"
					placeholder="Nombre Del Cliente"
					// value={form.client}
					onChange={e => setForm({ ...form, client: e.target.value })}
					defaultValue={form.client}

				/>
			</div>
			<input
				type="submit"
				value={project._id ? "actualizar proyecto" : "Crear proyecto"}
				className="bg-sky-600 p-3 w-full uppercase fron-bold text-white rounded cursor-pointer hover:bg-sky-700 transition-colors "
			/>
		</form>
	);
};
