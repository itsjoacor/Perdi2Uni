import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import fondoLogin from "../assets/fondos/fondoLogin.jpeg";

const Publicar = () => {
	const navigate = useNavigate();
	const userName = localStorage.getItem("userName");
	const dniUser = localStorage.getItem("dni") || ""; // Default to an empty string if null

	// Set the form state, including dni
	const [formDataCheck, setFormDataCheck] = useState({
		descripcion: "",
		fecha: "",
		horario: "",
		dni: dniUser, // Store dni from localStorage
	});

	useEffect(() => {
		// You can also add logic here to update the dni state if it changes
	}, []); // Empty array to run only once when the component mounts

	const handleChange = (e) => {
		setFormDataCheck((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const { descripcion, fecha, horario, dni } = formDataCheck;

		// Ensure the hora is in the correct format (HH:mm:ss)
		const formattedHora = `${horario}:00`; // Add ":00" for the seconds

		const newFormData = { descripcion, fecha, hora: formattedHora, dni };

		try {
			await axios.post(
				"http://localhost:8080/publicaciones/publicar", // URL of your backend
				newFormData
			);
			alert("Publicacion realizada correctamente");
			navigate("/home");
		} catch (error) {
			console.error("Error al publicar", error);
			if (error.response && error.response.data) {
				alert(error.response.data);
			} else {
				alert("Error al intentar publicar");
			}
		}
	};

	return (
		<div
			className="min-h-screen bg-cover bg-center flex items-center justify-center"
			style={{ backgroundImage: `url(${fondoLogin})` }}
		>
			{userName ? (
				<div className="bg-white bg-opacity-90 p-8 rounded-xl shadow-lg w-full max-w-md">
					<h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
						Realizar publicacion
					</h2>
					<form onSubmit={handleSubmit} className="space-y-4">
						<input
							type="text"
							name="descripcion"
							placeholder="Descripcion del objeto"
							value={formDataCheck.descripcion}
							onChange={handleChange}
							required
							className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
						/>
						<input
							type="date"
							name="fecha"
							value={formDataCheck.fecha}
							onChange={handleChange}
							required
							className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
						/>
						<input
							type="time"
							name="horario"
							value={formDataCheck.horario}
							onChange={handleChange}
							required
							className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
						/>

						<button
							type="submit"
							className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
						>
							Publicar
						</button>
					</form>
				</div>
			) : (
				<div className="flex flex-col items-center justify-center min-h-screen">
					<div className="bg-white bg-opacity-70 backdrop-blur-md p-10 rounded-xl shadow-xl">
						<h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
							<span className="bg-opacity-50 text-white px-3 py-1 rounded">
								Tenés que estar loggeado para poder realizar una publicacion!
							</span>
						</h1>
						<form className="w-full flex flex-col gap-4">
							<button
								type="button"
								className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200"
								onClick={() => navigate("/")}
							>
								Iniciar Sesión
							</button>
						</form>
					</div>
				</div>
			)}
		</div>
	);
};

export default Publicar;
