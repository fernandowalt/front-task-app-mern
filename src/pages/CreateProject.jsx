/** @format */

import React from "react";
import { FormProject } from "../components/FormProject";

export const CreateProject = () => {
	return (
		<>
			<h1 className="text-4xl font-black">Crear Proyecto</h1>
			<div className="mt-10 flex justify-center">
				<FormProject />
			</div>
		</>
	);
};
