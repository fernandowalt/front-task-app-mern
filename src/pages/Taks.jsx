/** @format */

import React from "react";
import { formatDate } from "../helpers/formatDate.js";
import useAdmin from "../hooks/useAdmin.jsx";
import useProjects from "../hooks/useProjects";

export const Taks = ({ task }) => {
	const { handleModalEditTask, handleModalDeleteTask, completeTask } = useProjects();
	const admin = useAdmin();
	const { description, priority, name, dateOfDelivery, state, _id } = task;

	return (
		<div className="border-b p-5 flex justify-between items-center">
			<div>
				<p className="text-xl mb-2">{name}</p>
				<p className="text-sm mb-2 text-gray-500 uppercase">{description}</p>
				<p className="text-sm mb-2">{formatDate(dateOfDelivery)}</p>
				<p className="text-gray-600 mb-2">Prioridad: {priority}</p>
				{state && <p className="text-xs bg-green-600 uppercase p-1 rounded-lg text-white ">completada por: {task.complete.name}</p>}
			</div>
			<div className="flex flex-col lg:flex-row gap-2  ">
				{admin && (
					<button
						onClick={() => handleModalEditTask(task)}
						className="bg-indigo-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg hover:bg-indigo-700 transition-colors "
					>
						Editar
					</button>
				)}

				<button
					onClick={() => completeTask(_id)}
					className={`${state ? "bg-sky-600 " : "bg-red-600 "}   text-white uppercase font-bold text-sm rounded-lg px-4 py-3`}
				>
					{state ? "Completa" : "Incompleta"}
				</button>

				{admin && (
					<button
						onClick={() => handleModalDeleteTask(task)}
						className="bg-red-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg hover:bg-red-700 transition-colors"
					>
						Eliminar
					</button>
				)}
			</div>
		</div>
	);
};
