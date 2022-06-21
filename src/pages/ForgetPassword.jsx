/** @format */

import { useState } from "react";
import { Link } from "react-router-dom";
import { Alert } from "../components/Alert";
import clientAxios from "../config/clientAxios";

export const ForgetPassword = () => {
	const [email, setEmail] = useState("");
	const [alert, setAlert] = useState({});

	const handleEmail = e => {
		e.preventDefault();
		setEmail(e.target.value);
	};

	const handleForm = async e => {
		e.preventDefault();

		if (email === "" || email.length < 6) {
			setAlert({ msg: "el email es obligatorio y debe tener minimo 6 caracteres", error: true });
			return;
		}

		try {
			const { data } = await clientAxios.post(`/usuarios/recoverPassword`, { email });
			setAlert({ msg: data.msg, error: false });
			setEmail("");
		} catch (error) {
			const { msg } = error.response.data;

			setAlert({ msg: msg, error: true });
		}
	};

	return (
		<>
			<h1 className="text-sky-600 font-black text-6xl capitalize">
				Recupera tu acceso y no pierdas tus <br />
				<span className="text-slate-700">proyectos</span>
			</h1>

			<form className="my-10 bg-white shadow rounded-lg p-10 mb-3" onSubmit={handleForm}>
				<div className="my-5">
					{alert.msg && <Alert alert={alert} />}
					<label className="uppercase text-gray-600 block text-xl font-bold " htmlFor="email">
						Email
					</label>
					<input
						id="email"
						type="email"
						placeholder="Email De Registro"
						className="w-full mt-2 p-3 border rounded-xl bg-gray-50"
						value={email}
						onChange={handleEmail}
					/>
				</div>

				<input
					type="submit"
					value="Recuperar Password"
					className="bg-sky-700 mb-5 w-full py-3 text-white rounded uppercase font-bold hover:cursor-pointer hover:bg-sky-800 transition-colors"
				/>
			</form>
			<nav className="lg:flex lg:justify-between">
				<Link to="/register" className="block text-center my-5 text-slate-500 uppercase text-sm">
					¿no tienes una cuenta? Registrate
				</Link>
				<Link to="/" className="block text-center my-5 text-slate-500 uppercase text-sm">
					¿Ya tienes una cuenta?
				</Link>
			</nav>
		</>
	);
};
