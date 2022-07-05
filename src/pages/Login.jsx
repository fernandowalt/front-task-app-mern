/** @format */

import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert } from "../components/Alert";
import clientAxios from "../config/clientAxios";
import useAuth from "../hooks/useAuth";
import useProjects from "../hooks/useProjects";

export const Login = () => {
	const { obtenerProyectos } = useProjects();
	const [form, setForm] = useState({ email: "", password: "" });
	const [alert, setalert] = useState({});
	const { email, password } = form;

	const { setAuth } = useAuth();
	let navigate = useNavigate();

	const handleSubmit = async e => {
		e.preventDefault();

		if ([email, password].includes("")) {
			setalert({ msg: "todos los campos son obligatorios", error: true });
			return;
		}

		try {
			const { data } = await clientAxios.post("/usuarios/login", { email, password });

			setalert({});
			localStorage.setItem("token", data.token);
			setForm({ email: "", password: "" });

			setAuth(data);
			obtenerProyectos();

			navigate("/projects");
		} catch (error) {
			const { msg } = error.response.data;
			setalert({ msg: msg, error: true });
		}
	};

	const { msg } = alert;

	return (
		<>
			<h1 className="text-sky-600 font-black text-6xl capitalize">
				Inicia sesión y administra tus <br />
				<span className="text-slate-700">proyectos</span>
			</h1>
			{msg && <Alert alert={alert} />}

			<form onSubmit={handleSubmit} className="my-10 bg-white shadow rounded-lg p-10 mb-3">
				<div className="my-5">
					<label className="uppercase text-gray-600 block text-xl font-bold " htmlFor="email">
						Email
					</label>
					<input
						id="email"
						type="email"
						placeholder="Email De Registro"
						className="w-full mt-2 p-3 border rounded-xl bg-gray-50"
						value={form.email}
						onChange={e => setForm({ ...form, email: e.target.value })}
						autoComplete="off"
					/>
				</div>
				<div className="my-5">
					<label className="uppercase text-gray-600 block text-xl font-bold " htmlFor="password">
						Contraseña
					</label>
					<input
						id="password"
						type="password"
						placeholder="Password De Registro"
						className="w-full mt-2 p-3 border rounded-xl bg-gray-50"
						value={form.password}
						onChange={e => setForm({ ...form, password: e.target.value })}
						autoComplete="off"
					/>
				</div>
				<input
					type="submit"
					value="Iniciar Sesion"
					className="bg-sky-700 mb-5 w-full py-3 text-white rounded uppercase font-bold hover:cursor-pointer hover:bg-sky-800 transition-colors"
				/>
			</form>
			<nav className="lg:flex lg:justify-between">
				<Link to="/register" className="block text-center my-5 text-slate-500 uppercase text-sm">
					¿no tienes una cuenta? Registrate
				</Link>
				<Link to="/forget-password" className="block text-center my-5 text-slate-500 uppercase text-sm">
					¿olvide mi contraseña?
				</Link>
			</nav>
		</>
	);
};
