/** @format */

import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import clientAxios from "../config/clientAxios";
import useAuth from "../hooks/useAuth";
import io from "socket.io-client";
let socket;

const ProjectsContext = createContext();

const ProjectsProvider = ({ children }) => {
	const [projects, setProjects] = useState([]);
	const [alert, setAlert] = useState({});
	const [project, setProject] = useState({});
	const [loading, setloading] = useState(false);
	const [modalTask, setModalTask] = useState(false);
	const [task, setTask] = useState({});
	const [modalDeleteTask, setModalDeleteTask] = useState(false);
	const [collaborator, setCollaborator] = useState({});
	const [modalDeleteCollaborators, setModalDeleteCollaborators] = useState(false);
	const [searcher, setSearcher] = useState(false);

	const navigate = useNavigate();
	const { auth } = useAuth;

	useEffect(() => {
		obtenerProyectos();
	}, [auth]);

	useEffect(() => {
		socket = io(import.meta.env.VITE_BACKEND_URL);
	}, []);

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
			console.log(error.message);
		}
	};

	const mostrarAlerta = alert => {
		setAlert(alert);
	};

	const submitProject = async project => {
		if (project.id !== null) {
			await editProject(project);
		} else {
			await newProject(project);
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

			setTimeout(() => {
				setAlert({});
			}, 2500);
		} finally {
			setloading(false);
		}
	};

	const editProject = async project => {
		const token = localStorage.getItem("token");
		const config = {
			headers: {
				"content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		};
		if (!token) return;

		try {
			const { data } = await clientAxios.put(`/proyectos/${project.id}`, project, config);

			setAlert({ msg: "Proyecto actualizado", error: false });
			setProjects([...projects, data]);
			const projectsUpdated = projects.map(project => (project._id === data._id ? data : project));
			setProjects(projectsUpdated);

			setTimeout(() => {
				navigate("/projects");
				setAlert({});
			}, 2000);
		} catch (error) {
			const { msg } = error.response.data;
			setAlert({ msg: msg, error: true });
		}
	};

	const newProject = async project => {
		const token = localStorage.getItem("token");
		const config = {
			headers: {
				"content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		};
		if (!token) return;

		try {
			const { data } = await clientAxios.post("/proyectos", project, config);

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

	const deleteProject = async id => {
		try {
			const token = localStorage.getItem("token");
			if (!token) return;
			const config = {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			};
			const { data } = await clientAxios.delete(`/proyectos/${id}`, config);
			setAlert({ msg: data.msg, error: false });

			const projectsUpdated = projects.filter(project => project._id !== id);
			setProjects(projectsUpdated);

			setTimeout(() => {
				navigate("/projects");
			}, 2000);
		} catch (error) {
			setAlert({
				msg: error.response.data.msg,
				error: true,
			});
		}
	};

	const handleModalTask = () => {
		setModalTask(!modalTask);
		setTask({});
		setAlert({});
	};

	const submitTask = async task => {
		if (task?.id) {
			await editTask(task);
		} else {
			await createTask(task);
		}
	};

	const createTask = async task => {
		const token = localStorage.getItem("token");
		const config = {
			headers: {
				"content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		};
		if (!token) return;

		try {
			const datos = { ...task, project: project._id };
			const { data } = await clientAxios.post("/tareas", datos, config);

			const projectUpdate = { ...project };
			projectUpdate.tasks = [...project.tasks, data];
			setProject(projectUpdate);

			setAlert({ msg: "tarea creada", error: false });

			handleModalTask();

			//SOCKET IO

			socket.emit("nueva tarea", data);
		} catch (error) {
			const { msg } = error.response.data;
			setAlert({ msg: msg, error: true });
		}
	};

	const editTask = async task => {
		try {
			const token = localStorage.getItem("token");
			if (!token) return;
			const config = {
				headers: {
					"content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			};
			const { data } = await clientAxios.put(`/tareas/${task.id}`, task, config);

			socket.emit("editar tarea", data);

			setAlert({});
			setModalTask(false);
		} catch (error) {
			console.log(error);
		}
	};

	const handleModalEditTask = tarea => {
		setTask(tarea);
		setModalTask(!modalTask);
	};

	const handleModalDeleteTask = task => {
		setTask(task);
		setModalDeleteTask(!modalDeleteTask);
	};

	const deleteTask = async () => {
		try {
			const token = localStorage.getItem("token");
			if (!token) return;
			const config = {
				headers: {
					"content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			};
			const { data } = await clientAxios.delete(`/tareas/${task._id}`, config);
			setAlert({ msg: data.msg, error: false });

			setModalDeleteTask(false);

			socket.emit("eliminar tarea", task);

			setTimeout(() => {
				setAlert({});
			}, 2000);
		} catch (error) {
			console.log(error);
		}
	};

	const submitCollaborator = async email => {
		setloading(true);
		try {
			const token = localStorage.getItem("token");
			if (!token) return;
			const config = {
				headers: {
					"content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			};

			const { data } = await clientAxios.post("/proyectos/collaborators", { email }, config);
			setCollaborator(data);
			setAlert({});
		} catch (error) {
			setAlert({ msg: error.response.data.msg, error: true });
		} finally {
			setloading(false);
		}
	};

	const addCollaborator = async email => {
		try {
			const token = localStorage.getItem("token");
			if (!token) return;
			const config = {
				headers: {
					"content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			};

			const { data } = await clientAxios.post(`/proyectos/collaborators/${project._id}`, email, config);
			setAlert({ msg: data.msg, error: false });
			setCollaborator({});

			setTimeout(() => {
				setAlert({});
			}, 2500);
		} catch (error) {
			setAlert({ msg: error.response.data.msg, error: true });
		}
	};

	const handleModalDeleteCollaborator = async collaborator => {
		setModalDeleteCollaborators(!modalDeleteCollaborators);
		setCollaborator(collaborator);
	};

	const deleteCollaborator = async () => {
		try {
			const token = localStorage.getItem("token");
			if (!token) return;
			const config = {
				headers: {
					"content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			};

			const { data } = await clientAxios.post(`/proyectos/delete-collaborator/${project._id}`, { id: collaborator._id }, config);
			const updatedProject = { ...project };
			updatedProject.collaborators = updatedProject.collaborators.filter(collaboratorStatus => collaboratorStatus._id !== collaborator._id);
			setProject(updatedProject);
			setAlert({ msg: data.msg, error: false });
			setCollaborator({});
			setModalDeleteCollaborators(false);

			setTimeout(() => {
				setAlert({});
			}, 2500);
		} catch (error) {
			console.log(error.response);
		}
	};

	const completeTask = async id => {
		try {
			const token = localStorage.getItem("token");
			if (!token) return;
			const config = {
				headers: {
					"content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			};

			const { data } = await clientAxios.post(`/tareas/state/${id}`, {}, config);

			socket.emit("cambiar estado", data);

			setTask({});
			setAlert({});
		} catch (error) {
			console.log(error.response);
		}
	};
	const handleSearcher = () => {
		console.log(project);
		setSearcher(!searcher);
	};
	//socket io
	const submitTaskProject = task => {
		//añadiendo la tarea al state del proyecto
		const projectUpdate = { ...project };

		projectUpdate.tasks = [...projectUpdate.tasks, task];

		setProject(projectUpdate);
	};

	const socketEliminarTarea = task => {
		const projectUpdate = { ...project };
		projectUpdate.tasks = projectUpdate.tasks.filter(taskState => taskState._id !== task._id);

		setProject(projectUpdate);
	};

	const socketEditarTarea = task => {
		const projectUpdate = { ...project };
		projectUpdate.tasks = projectUpdate.tasks.map(taskState => (taskState._id === task._id ? task : taskState));

		setProject(projectUpdate);
	};

	const socketCambiarEstado = task => {
		const updatedProject = { ...project };

		updatedProject.tasks = updatedProject.tasks.map(taskStatus => (taskStatus._id === task._id ? task : taskStatus));

		setProject(updatedProject);
	};

	const cerrarSesionProyectos = () => {
		setProjects([]);
		setProject({});
		setAlert({});
	};

	return (
		<ProjectsContext.Provider
			value={{
				projects,
				mostrarAlerta,
				alert,
				setAlert,
				submitProject,
				obtenerProyecto,
				project,
				loading,
				setProject,
				deleteProject,
				modalTask,
				handleModalTask,
				submitTask,
				handleModalEditTask,
				task,
				setModalDeleteTask,
				modalDeleteTask,
				handleModalDeleteTask,
				deleteTask,
				submitCollaborator,
				collaborator,
				addCollaborator,
				modalDeleteCollaborators,
				handleModalDeleteCollaborator,
				deleteCollaborator,
				completeTask,
				searcher,
				handleSearcher,
				submitTaskProject,
				socketEliminarTarea,
				socketEditarTarea,
				socketCambiarEstado,
				cerrarSesionProyectos,
				obtenerProyectos
			}}
		>
			{children}
		</ProjectsContext.Provider>
	);
};

export { ProjectsProvider };

export default ProjectsContext;
