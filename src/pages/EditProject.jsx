/** @format */

import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useProjects from "../hooks/useProjects";

export const EditProject = () => {
	const params = useParams();

	const { project, obtenerProyecto, loading } = useProjects();

	useEffect(() => {
			obtenerProyecto(params.id);
	}, []);

	const { name } = project;

	if (loading) return "Cargando...";

	return <div>Editar Proyecto: {name}</div>;
};
