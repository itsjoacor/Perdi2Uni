import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import fondoLogin from "../assets/fondos/fondoLogin.jpeg";

const Publicar = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem("userName");
  const dniUser = localStorage.getItem("dni") || "";

  const [formDataCheck, setFormDataCheck] = useState({
    descripcion: "",
    fecha: "",
    horario: "",
    dni: dniUser,
    lugarDeExtravio: "",
    universidad: "",
  });

  const handleChange = (e) => {
    setFormDataCheck((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validateDescripcion = (descripcion) => {
    if (descripcion.length < 3) {
      alert("Descripción inválida");
      return false;
    }

    const numberRegex = /^[0-9]+$/;
    if (numberRegex.test(descripcion)) {
      alert("Descripción inválida");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      descripcion,
      fecha,
      horario,
      dni,
      lugarDeExtravio,
      universidad,
    } = formDataCheck;

    if (!validateDescripcion(descripcion)) {
      return;
    }

    const formattedHora = `${horario}:00`;

    const newFormData = {
      descripcion,
      fecha,
      hora: formattedHora,
      dni,
      lugarDeExtravio,
      universidad,
    };

    try {
      await axios.post(
        "http://localhost:8080/publicaciones/publicar",
        newFormData
      );
      alert("Publicación realizada correctamente");
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
            Realizar publicación
          </h2>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Descripción
          </label>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="descripcion"
              placeholder="Descripción del objeto"
              value={formDataCheck.descripcion}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Fecha de pérdida
              </label>
              <input
                type="date"
                name="fecha"
                value={formDataCheck.fecha}
                max={new Date().toISOString().split("T")[0]}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Horario de pérdida
              </label>
              <input
                type="time"
                name="horario"
                value={formDataCheck.horario}
                min="08:00"
                max="23:00"
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Universidad
              </label>
              <select
                name="universidad"
                value={formDataCheck.universidad}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="">Seleccione una universidad</option>
                <option value="UNIVERSIDAD_NACIONAL_DE_QUILMES">
                  Universidad Nacional de Quilmes
                </option>
                <option value="UNIVERSIDAD_TECNICA_NACIONAL">
                  Universidad Técnica Nacional
                </option>
                <option value="UNIVERSIDAD_NACIONAL_ARTURO_JAURETCHE">
                  Universidad Nacional Arturo Jauretche
                </option>
              </select>
            </div>
            <div className="mb-4 pb-6">
              <label className="block text-sm font-medium text-gray-700">
                Lugar
              </label>
              <input
                type="text"
                name="lugarDeExtravio"
                value={formDataCheck.lugarDeExtravio}
                placeholder="Lugar de extravío (opcional)"
                onChange={handleChange}
                maxLength={50}
                className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>



            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
            >
              Publicar
            </button>
            <button
              type="button"
              onClick={() => navigate("/home")}
              className="w-full bg-red-200 text-red-800 font-semibold py-2 px-4 rounded-md hover:bg-red-300 transition duration-300"
            >
              Volver al Inicio
            </button>
          </form>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <div className="bg-white bg-opacity-70 backdrop-blur-md p-10 rounded-xl shadow-xl">
            <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
              <span className="bg-opacity-50 text-white px-3 py-1 rounded">
                Tenés que estar loggeado para poder realizar una publicación!
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
