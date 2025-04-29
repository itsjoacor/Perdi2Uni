import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import fondoLogin from "../assets/fondos/fondoLogin.jpeg";

const Perfil = () => {
  const navigate = useNavigate();

  // Retrieve user data from localStorage
  const userName = localStorage.getItem("userName");
  const correo = localStorage.getItem("correo");
  const dni = localStorage.getItem("dni");
  const [formData, setFormData] = useState({
    nombre: userName || "",
    correo: correo || "",
    dni: dni || "",
  });

  // State to manage whether fields are editable
  const [isEditable, setIsEditable] = useState(false);

  // Handle form field changes
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Navigate to edit page
  const handleEditClick = () => {
    setIsEditable(true); // Enable the fields for editing
    navigate("/perfil/editar"); // Navigate to edit profile page (can be used later to update backend)
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${fondoLogin})` }}
    >
      <div className="bg-white bg-opacity-90 p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Mi Perfil
        </h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="font-medium text-gray-700">
              Nombre y Apellido
            </label>
            <input
              type="text"
              name="nombre"
              placeholder="Nombre y Apellido"
              value={formData.nombre}
              onChange={handleChange}
              disabled={!isEditable} // Disable if not editable
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="space-y-2">
            <label className="font-medium text-gray-700">
              Correo electrónico
            </label>
            <input
              type="email"
              name="correo"
              placeholder="Correo electrónico"
              value={formData.correo}
              onChange={handleChange}
              disabled={!isEditable} // Disable if not editable
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="space-y-2">
            <label className="font-medium text-gray-700">DNI</label>
            <input
              type="text"
              name="dni"
              placeholder="DNI"
              value={formData.dni}
              onChange={handleChange}
              disabled={!isEditable} // Disable if not editable
              inputMode="numeric"
              maxLength={8}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Button to enable editing */}
          {!isEditable && (
            <button
              type="button"
              onClick={handleEditClick}
              className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
            >
              Editar Perfil
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Perfil;
