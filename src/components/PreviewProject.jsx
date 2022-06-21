/** @format */

import { Link } from "react-router-dom";

export const PreviewProject = ({ project }) => {
	const { name, _id, client } = project;
	return (
		<div className="border-b p-4 flex">
			<p className="flex-1">
				{name}
				<span className="text-gray-500 uppercase">
					{" "}
					{client}
				</span>{" "}
			</p>
			<Link className="text-gray-600 hover:text-gray-800 uppercase text-sm font-bold" to={`${_id}`}>
				Ver Proyecto
			</Link>
		</div>
	);
};
