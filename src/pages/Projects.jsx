/** @format */

import { PreviewProject } from "../components/PreviewProject";
import { Alert } from "../components/Alert";
import useProjects from "../hooks/useProjects";

let socket;

export const Projects = () => {
	const { projects, alert } = useProjects();

	const { msg } = alert;
	return (
		<>
			<h1 className="text-4xl font-black">Proyectos</h1>

			{msg && <Alert alert={alert} />}

			<div className="bg-white shadow mt-10 rounded-lg">
				{projects.length ? (
					projects.map(project => <PreviewProject project={project} key={project._id} />)
				) : (
					<p className="text-center text-gray-600 uppercase p-5">no hay proyectos aún</p>
				)}
			</div>
		</>
	);
};
