/** @format */

export const formatDate = date => {
	const nuevaFecha = new Date(date.split('T')[0].split('-'));

	const options = {
		weekday: "long",
		year: "numeric",
		month: "long",
		day: "numeric",
	};

	return nuevaFecha.toLocaleDateString("es-ES", options);
};
