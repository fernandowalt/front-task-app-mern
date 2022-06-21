/** @format */
import useProjects from "../hooks/useProjects";
import { PreviewProject } from "../components/PreviewProject";

export const Projects = () => {
	const { projects } = useProjects();

	return (
		<>
			<h1 className="text-4xl font-black">Proyectos</h1>

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
