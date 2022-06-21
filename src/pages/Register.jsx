/** @format */

import { useState } from "react";
import { Link } from "react-router-dom";
import { Alert } from "../components/Alert";
import clientAxios from "../config/clientAxios";

export const Register = () => {
	const [alert, setAlert] = useState({});
	const [form, setForm] = useState({
		name: "",
		email: "",
		password: "",
		password2: "",
	});



	const { name, email, password, password2 } = form;

	const handleSubmit = async e => {
		e.preventDefault();

		if ([name, email, password, password2].includes("")) {
			setAlert({ msg: "Todos los campos son obligatorios", error: true });
			return;
		}
		if (password !== password2) {
			setAlert({ msg: "las contraseñas no son iguales", error: true });
			return;
		}
		if (password.length < 6) {
			setAlert({ msg: "la contraseña debe tener minimo 7 caracteres", error: true });
			return;
		}
		setAlert({});

		try {
			const { data } = await clientAxios.post(`/usuarios`, { name, email, password });
			setAlert({ msg: data.msg, error: false });

			setForm({ name: "", email: "", password: "", password2: "" });
		} catch (error) {
			setAlert({ msg: error.response.data.msg, error: true });
		}
	};
	const { msg } = alert;

	return (
		<>
			<h1 className="text-sky-600 font-black text-6xl capitalize">
				crea tu cuenta y administra tus
				<br />
				<span className="text-slate-700">proyectos</span>
			</h1>

			{msg && <Alert alert={alert} />}

			<form className="my-10 bg-white shadow rounded-lg p-10 mb-3 " onSubmit={handleSubmit}>
				<div className="my-5">
					<label className="uppercase text-gray-600 block text-xl font-bold " htmlFor="name">
						Nombre
					</label>
					<input
						id="name"
						type="text"
						placeholder="Email De Registro"
						className="w-full mt-2 p-3 border rounded-xl bg-gray-50"
						value={form.name}
						onChange={e => {
							setForm({ ...form, name: e.target.value });
						}}
					/>
				</div>
				<div className="my-5">
					<label className="uppercase text-gray-600 block text-xl font-bold " htmlFor="email">
						Email
					</label>
					<input
						autoComplete="email"
						id="email"
						type="email"
						placeholder="Email De Registro"
						className="w-full mt-2 p-3 border rounded-xl bg-gray-50 "
						value={form.email}
						onChange={e => {
							setForm({ ...form, email: e.target.value });
						}}
					/>
				</div>
				<div className="my-5">
					<label className="uppercase text-gray-600 block text-xl font-bold " htmlFor="password">
						Password
					</label>
					<input
						autoComplete="new-password"
						id="password"
						type="password"
						placeholder="Password"
						className="w-full mt-2 p-3 border rounded-xl bg-gray-50"
						value={form.password}
						onChange={e => {
							setForm({ ...form, password: e.target.value });
						}}
					/>
				</div>
				<div className="my-5">
					<label className="uppercase text-gray-600 block text-xl font-bold " htmlFor="password2">
						Repetir Password
					</label>
					<input
						autoComplete="new-password"
						id="password2"
						type="password"
						placeholder="Repetir Password"
						className="w-full mt-2 p-3 border rounded-xl bg-gray-50"
						value={form.password2}
						onChange={e => {
							setForm({ ...form, password2: e.target.value });
						}}
					/>
				</div>
				<input
					type="submit"
					value="Crear Cuenta"
					className="bg-sky-700 mb-5 w-full py-3 text-white rounded uppercase font-bold hover:cursor-pointer hover:bg-sky-800 transition-colors"
				/>
			</form>
			<nav className="lg:flex lg:justify-between">
				<Link to="/" className="block text-center my-5 text-slate-500 uppercase text-sm">
					¿Ya tienes una cuenta?
				</Link>
				<Link to="/forget-password" className="block text-center my-5 text-slate-500 uppercase text-sm">
					¿olvide mi contraseña?
				</Link>
			</nav>
		</>
	);
};
