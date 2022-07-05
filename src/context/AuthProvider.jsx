/** @format */

import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import clientAxios from "../config/clientAxios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	const [auth, setAuth] = useState({ name: "" });
	const [loading, setloading] = useState(true);

	const navigate = useNavigate();

	useEffect(() => {
		const autenticatedUser = async () => {
			const token = localStorage.getItem("token");
			if (!token) {
				setloading(false);
				return;
			}

			const config = {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			};

			try {
				const { data } = await clientAxios("/usuarios/profile", config);
				setAuth(data);
			} catch (error) {
				setAuth({});
			}

			setloading(false);
		};

		autenticatedUser();
	}, []);

	const cerrarSesionAuth = () => {
		setAuth({});
	};

	return <AuthContext.Provider 
			value={{ setAuth, auth, loading,cerrarSesionAuth}}
		>
			{children}
		</AuthContext.Provider>;
};

export { AuthProvider };

export default AuthContext;
