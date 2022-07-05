/** @format */

import { Link } from "react-router-dom";
import useAunt from "../hooks/useAuth";
import useProjects from "../hooks/useProjects";

export const Sidebar = () => {
	const { setProject } = useProjects();
	const { auth } = useAunt();
	const { name } = auth;

	const handleClick = () => {
		setProject({});
	};

	return (
		<aside className="md:w-1/3 lg:w-1/5 xl:w-1/6 px-5 py-10">
			<p className="text-xl font-bold">Hola: {name}</p>
			<Link
				to="create-project"
				className="bg-sky-600 w-full p-3 text-white uppercase font-bold block mt-5 text-center rounded-md"
				onClick={handleClick}
			>
				Nuevo Proyecto
			</Link>
		</aside>
	);
};
