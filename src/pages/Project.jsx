/** @format */

import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import useProjects from "../hooks/useProjects";
import useAdmin from "../hooks/useAdmin";

import ModalFormularioTarea from "../components/ModalFormTask";
import ModalDeleteTask from "../components/ModalDeleteTask";
import { Taks } from "./Taks";

import { Collaborator } from "../components/Collaborator";
import ModalDeleteCollaborator from "../components/ModalDeleteCollaborator";
import io from "socket.io-client";

let socket;

export const Project = () => {
	const params = useParams();
	const {
		obtenerProyecto,
		project,
		loading,
		handleModalTask,
		alert,
		submitTaskProject,
		socketEliminarTarea,
		socketEditarTarea,
		socketCambiarEstado,
	} = useProjects();
	const admin = useAdmin();

	useEffect(() => {
		obtenerProyecto(params.id);
	}, []);

	useEffect(() => {
		socket = io(import.meta.env.VITE_BACKEND_URL);
		socket.emit("abrir proyecto", params.id);
	}, []);

	useEffect(() => {
		socket.on("tarea agregada", nuevaTarea => {
			if (nuevaTarea.project === project._id) {
				submitTaskProject(nuevaTarea);
			}
		});

		socket.on("tarea eliminada", tareaEliminada => {
			if (tareaEliminada.project === project._id) {
				socketEliminarTarea(tareaEliminada);
			}
		});

		socket.on("tarea editada", tareaEditada => {
			if (tareaEditada.project._id === project._id) {
				socketEditarTarea(tareaEditada);
			}
		});
		socket.on("estado cambiado", estadoTarea => {
			if (estadoTarea.project._id === project._id) {
				socketCambiarEstado(estadoTarea);
			}
		});
	});

	const { name } = project;

	if (loading) return "Cargando...";

	const { msg } = alert;

	return (
		<>
			<div className="flex justify-between">
				<h1 className="font-black text-3xl uppercase">{name}</h1>

				{admin && (
					<div className="flex items-center gap-2 text-gray-400 hover:text-black  ">
						<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
							/>
						</svg>

						<Link to={`/projects/edit/${params.id}`} className="uppercase font-bold">
							Editar
						</Link>
					</div>
				)}
			</div>

			{admin && (
				<button
					type="button"
					className="text-sm px-5 py-3 w-full md:w-auto rounded-lg uppercase font-bold bg-sky-400 text-white text-center mt-4 flex gap-2 items-center"
					onClick={handleModalTask}
				>
					<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
						<path
							fillRule="evenodd"
							d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
							clipRule="evenodd"
						/>
					</svg>
					Nueva Tarea
				</button>
			)}

			<p className="font-bold text-xl mt-10">Tareas del Proyecto</p>

			<div className="bg-white shadow mt-10 rounded-lg">
				{project.tasks?.length ? (
					
					project.tasks?.map(tarea => <Taks key={tarea._id} task={tarea} />)
				) : (
					<p className="text-center my-5 p-10">No hay tareas en este proyecto</p>
				)}
			</div>
			<div className="flex items-center justify-between mt-2">
				<p className="font-bold text-xl mt-10">Colaboradores</p>

				{admin && (
					<Link to={`/projects/collaborators/${project._id}`} className="text-gray-400 hover:text-black uppercase font-bold">
						Añadir
					</Link>
				)}
			</div>

			<div className="bg-white shadow mt-10 rounded-lg">
				{project.collaborators?.length ? (
					project.collaborators?.map(collaborator => <Collaborator key={collaborator._id} collaborator={collaborator} />)
				) : (
					<p className="text-center my-5 p-10">No hay colaboradores en este proyecto</p>
				)}
			</div>

			<ModalFormularioTarea />
			<ModalDeleteTask />
			<ModalDeleteCollaborator />
		</>
	);
};
