import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import fondoHome from "../assets/fondos/fondoHome.jpg";
import axios from "axios";

const Home = () => {
	const userName = localStorage.getItem("userName");
	const navigate = useNavigate();
	const [data, setData] = useState([]);

	useEffect(() => {
		axios
			.get("http://localhost:8080/publicaciones/")
			.then((response) => {
				console.log("Response data:", response.data); // Debugging line to check the structure of the data
				setData(response.data);
			})
			.catch((error) => {
				console.error("Error fetching data:", error);
			});
	}, []);

	return (
		<div
			className="min-h-screen bg-cover bg-center"
			style={{ backgroundImage: `url(${fondoHome})` }}
		>
			{userName ? (
				<div>
					<Navbar />
					{data.length > 0 ? (
						<div className="mt-20 bg-white shadow-md rounded-lg p-6 text-gray-700 w-150 max-w-md mx-auto">
							<table className="table-auto w-full text-left">
								<thead>
									<tr className="bg-blue-200">
										<th className="px-4 py-2">HORA</th>
										<th className="px-4 py-2">NOMBRE</th>
										<th className="px-4 py-2">CORREO</th>
										<th className="px-4 py-2">DESCRIPCIÓN</th>
									</tr>
								</thead>
								<tbody>
									{data.map((item, index) => {
										console.log("Rendering item:", item); // Log each item
										return (
											<tr key={index} className="border-b">
												<td className="px-4 py-2">{item.hora}</td>
												<td className="px-4 py-2">{item.nombre}</td>
												<td className="px-4 py-2">{item.correo}</td>
												<td className="px-4 py-2">{item.descripcion}</td>
											</tr>
										);
									})}
								</tbody>
							</table>
						</div>
					) : (
						<div className="mt-20 bg-white shadow-md rounded-lg p-6 text-center text-gray-700 w-150 max-w-md mx-auto">
							Aún no hay objetos perdidos.
						</div>
					)}
				</div>
			) : (
				<div className="flex flex-col items-center justify-center min-h-screen">
					<div className="bg-white bg-opacity-70 backdrop-blur-md p-10 rounded-xl shadow-xl">
						<h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
							<span className="bg-opacity-50 text-white px-3 py-1 rounded">
								Tenés que estar loggeado para acceder a la página!
							</span>
						</h1>
						<form className="w-full flex flex-col gap-4">
							<button
								type="submit"
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

export default Home;
