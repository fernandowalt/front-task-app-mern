/** @format */

import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import clientAxios from "../config/clientAxios";

const ProjectsContext = createContext();

const ProjectsProvider = ({ children }) => {
	const [projects, setProjects] = useState([]);
	const [alert, setAlert] = useState({});
	const [project, setProject] = useState({});
	const [loading, setloading] = useState(false);

	const navigate = useNavigate();

	useEffect(() => {
		const obtenerProyectos = async () => {
			try {
				const token = localStorage.getItem("token");
				if (!token) return;
				const config = {
					headers: {
						"content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				};
				const { data } = await clientAxios("/proyectos", config);
				setProjects(data);
			} catch (error) {
				console.log(error);
			}
		};

		obtenerProyectos();
	}, []);

	const mostrarAlerta = alert => {
		setAlert(alert);
	};

	const submitProject = async proyecto => {
		const token = localStorage.getItem("token");
		const config = {
			headers: {
				"content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		};
		if (!token) return;

		try {
			const { data } = await clientAxios.post("/proyectos", proyecto, config);

			setAlert({ msg: "Proyecto creado", error: false });
			setProjects([...projects, data]);
			setTimeout(() => {
				navigate("/projects");
			}, 2000);
		} catch (error) {
			const { msg } = error.response.data;
			setAlert({ msg: msg, error: true });
		}
	};

	const obtenerProyecto = async id => {
		setloading(true);
		try {
			const token = localStorage.getItem("token");
			if (!token) return;
			const config = {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			};
			const { data } = await clientAxios(`/proyectos/${id}`, config);
			setProject(data);
			setAlert({});
		} catch (error) {
			navigate("/projects");
			setAlert({
				msg: error.response.data.msg,
				error: true,
			});
		} finally {
			setloading(false);
		}
	};

	return (
		<ProjectsContext.Provider value={{ projects, mostrarAlerta, alert, submitProject, obtenerProyecto, project, loading }}>
			{children}
		</ProjectsContext.Provider>
	);
};

export { ProjectsProvider };

export default ProjectsContext;
