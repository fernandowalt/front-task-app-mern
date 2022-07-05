/** @format */

import React from "react";
import useAuth from "../hooks/useAuth";
import useProjects from "../hooks/useProjects";

export const Collaborator = ({ collaborator }) => {
	const { auth } = useAuth();
	const { handleModalDeleteCollaborator, project } = useProjects();

	const { name, email } = collaborator;

	return (
		<div className="border-b p-5 flex justify-between items-center ">
			<div>
				<p>{name}</p>
				<p className="text-sm text-gray-700">{email}</p>
			</div>
			<div>
				{project.creator.toString() === auth._id.toString() ? (
					<button
						onClick={() => handleModalDeleteCollaborator(collaborator)}
						type="button"
						className="bg-red-600 hover:bg-red-700 transition-colors px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
					>
						Eliminar
					</button>
				) : (
					""
				)}
			</div>
		</div>
	);
};
