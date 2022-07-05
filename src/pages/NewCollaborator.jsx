/** @format */

import { useEffect } from "react";
import { FormCollaborators } from "./FormCollaborators";
import useProjects from "../hooks/useProjects";
import { useParams } from "react-router-dom";
import { Alert } from "../components/Alert";
export const NewCollaborator = () => {
	const { obtenerProyecto, project, collaborator, loading, addCollaborator } = useProjects();
	const { id } = useParams();
	useEffect(() => {
		obtenerProyecto(id);
	}, []);

	if (!project?._id) {
		return <Alert alert={{ msg: "proyecto no encontrado", error: true }} />;
	}

	return (
		<>
			<h1 className="text-4xl font-bold">Añadir Colaborador(a) al proyecto:{project.name} </h1>
			<div className="mt-10 flex justify-center ">
				<FormCollaborators />
			</div>
			{loading ? (
				<p className="text-center">Cargando...</p>
			) : (
				collaborator?._id && (
					<div className="flex justify-center mt-10">
						<div className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow w-full">
							<h2 className="text-center mb-10 text-2xl font-bold ">Resultado:</h2>
							<div className="flex justify-between items-center">
								<p>{collaborator.name}</p>

								<button
									onClick={() => addCollaborator({ email: collaborator.email })}
									type="button"
									className="bg-slate-500 px-5 py-2 rounded-lg uppercase text-white font-bold text-sm "
								>
									Agregar Colaborador
								</button>
							</div>
						</div>
					</div>
				)
			)}
		</>
	);
};
