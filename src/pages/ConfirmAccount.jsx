/** @format */

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Alert } from "../components/Alert";
import clientAxios from "../config/clientAxios";

export const ConfirmAccount = () => {
	const [alert, setAlert] = useState({});

	const [confirmedAcount, setConfirmedAcount] = useState(false);

	const { id } = useParams();

	useEffect(() => {
		const confirm = async () => {
			try {
				const { data } = await clientAxios(`/usuarios/confirm/${id}`);
				setAlert({ msg: data.msg, error: false });
				setConfirmedAcount(true);
			} catch (error) {
				setAlert({ msg: error.response.data.msg, error: true });
			}
		};
		return () => confirm();
	}, []);

	const { msg } = alert;

	return (
		<>
			<h1 className="text-sky-600 font-black text-6xl capitalize">
				confirma tu cuenta y empieza a crear tus
				<br />
				<span className="text-slate-700">proyectos</span>
			</h1>
			<div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
				{msg && <Alert alert={alert} />}
				{confirmedAcount && (
					<Link to="/" className="block text-center my-5 text-slate-500 uppercase text-sm">
						Iniciar Sesion
					</Link>
				)}
			</div>
		</>
	);
};
