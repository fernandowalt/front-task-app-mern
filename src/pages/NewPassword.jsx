/** @format */
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Alert } from "../components/Alert";
import clientAxios from "../config/clientAxios";

export const NewPassword = () => {
	const [password, setPassword] = useState("");
	const { id } = useParams();
	const [alert, setAlert] = useState({});
	const [tokenValido, setTokenValido] = useState(false);
	const [passwordModificado, setPasswordModificado] = useState(false);

	useEffect(() => {
		const comprobarToken = async () => {
			try {
				await clientAxios(`/usuarios/recoverPassword/${id}`);
				setTokenValido(true);
			} catch (error) {
				setTokenValido(false);
				const { msg } = error.response.data;

				setAlert({ msg: msg, error: true });
			}
		};
		comprobarToken();
	}, []);

	const handleChange = e => {
		e.preventDefault();
		setPassword(e.target.value);
	};

	const handleSubmit = async e => {
		e.preventDefault();
		if (password.length < 6) {
			setAlert({ msg: "la contraseña debe tener minimo 6 caracteres", error: true });
			return;
		}

		try {
			const { data } = await clientAxios.post(`/usuarios/recoverPassword/${id}`, { password });
			setAlert({ msg: data.msg, error: false });
			setPassword("");
			setPasswordModificado(true);
		} catch (error) {
			const { msg } = error.response.data;
			setAlert({ msg: msg, error: true });
			setPasswordModificado(false);
		}
	};

	const { msg } = alert;
	return (
		<>
			<h1 className="text-sky-600 font-black text-6xl capitalize">
				reestablece tu password y no pierdas el acceso a tus
				<br />
				<span className="text-slate-700">proyectos</span>
			</h1>
			{msg && <Alert alert={alert} />}

			{tokenValido && (
				<form onSubmit={handleSubmit} className="my-10 bg-white shadow rounded-lg p-10 mb-3">
					<div className="my-5">
						<label className="uppercase text-gray-600 block text-xl font-bold " htmlFor="password">
							nuevo password
						</label>
						<input
							id="password"
							type="password"
							placeholder="Escribe Tu Nuevo Password"
							className="w-full mt-2 p-3 border rounded-xl bg-gray-50"
							onChange={handleChange}
							value={password}
							autoComplete="new-password"
						/>
					</div>

					<input
						type="submit"
						className="bg-sky-700 mb-5 w-full py-3 text-white rounded uppercase font-bold hover:cursor-pointer hover:bg-sky-800 transition-colors"
					/>
				</form>
			)}

			{passwordModificado && (
				<nav className="lg:flex lg:justify-between">
					<Link to="/" className="block text-center my-3 text-slate-500 uppercase text-sm">
						iniciar sesion
					</Link>
				</nav>
			)}
		</>
	);
};
