import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import fondoLogin from "../assets/fondos/fondoLogin.jpeg";

const Perfil = () => {
  const navigate = useNavigate();

  const userName = localStorage.getItem("userName");
  const correo = localStorage.getItem("correo");
  const dni = localStorage.getItem("dni");

  const [formData, setFormData] = useState({
    nombre: userName || "",
    correo: correo || "",
    dni: dni || "",
  });

  const [isEditable, setIsEditable] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleEditClick = () => {
    setIsEditable(true);
  };

  const handleCancelEdit = () => {
    // Restaurar valores originales y salir del modo edición
    setFormData({
      nombre: userName || "",
      correo: correo || "",
      dni: dni || "",
    });
    setIsEditable(false);
  };

  const handleSaveChanges = async () => {
    const confirmUpdate = window.confirm("¿Guardar los cambios?");
    if (!confirmUpdate) return;

    try {
      const updatedData = {
        nombre: formData.nombre,
        dni: formData.dni,
        correo: formData.correo,
      };

      await axios.put("http://localhost:8080/academicos/actualizar", updatedData);

      // Actualizar localStorage
      localStorage.setItem("userName", updatedData.nombre);
      localStorage.setItem("dni", updatedData.dni);

      // Ir a Home
      navigate("/home");
    } catch (error) {
      console.error(error);
      alert("Error al actualizar los datos.");
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${fondoLogin})` }}
    >
      <div className="bg-white bg-opacity-90 p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Mi Perfil</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="font-medium text-gray-700">Nombre y Apellido</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              disabled={!isEditable}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="space-y-2">
            <label className="font-medium text-gray-700">Correo electrónico</label>
            <input
              type="email"
              name="correo"
              value={formData.correo}
              disabled
              className="w-full px-4 py-2 border bg-gray-100 rounded-md"
            />
          </div>

          <div className="space-y-2">
            <label className="font-medium text-gray-700">DNI</label>
            <input
              type="text"
              name="dni"
              value={formData.dni}
              onChange={handleChange}
              disabled={!isEditable}
              inputMode="numeric"
              maxLength={8}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {!isEditable ? (
            <button
              type="button"
              onClick={handleEditClick}
              className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
            >
              Editar Perfil
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={handleSaveChanges}
                className="w-full bg-green-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-700 transition duration-300 mb-2"
              >
                Guardar Cambios
              </button>
              <button
                type="button"
                onClick={handleCancelEdit}
                className="w-full bg-gray-400 text-white font-semibold py-2 px-4 rounded-md hover:bg-gray-500 transition duration-300"
              >
                Volver al perfil
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Perfil;
