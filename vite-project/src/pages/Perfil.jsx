import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import fondoLogin from "../assets/fondos/fondoLogin.jpeg";
import Info from "../components/Info";
import Warning from "../components/Warning";

const Perfil = () => {
  const navigate = useNavigate();
  const [info, setInfo] = useState(false);
  const [warning, setWarning] = useState(false);

  const userName = localStorage.getItem("userName") || "";
  const correo = localStorage.getItem("correo") || "";
  const dni = localStorage.getItem("dni") || "";
  const rol = localStorage.getItem("rol") || "";

  const [formData, setFormData] = useState({
    nombre: userName,
    correo: correo,
    dni: dni,
  });

  const [isEditable, setIsEditable] = useState(false);

  const validarDNI = (dni) => {
    const dniRegex = /^\d{7,8}$/;
    return dniRegex.test(dni);
  };

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
    setFormData({
      nombre: userName,
      correo: correo,
      dni: dni,
    });
    setIsEditable(false);
    setWarning(false);
  };

  const handleSaveChanges = async () => {
    if (!validarDNI(formData.dni)) {
      setInfo(true);
      return;
    }

    try {
      const updatedData = {
        nombre: formData.nombre.trim(),
        dni: formData.dni.trim(),
        correo: formData.correo.trim(),
      };

      const response = await axios.put(
        "http://localhost:8080/academicos/actualizar",
        updatedData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        localStorage.setItem("userName", updatedData.nombre);
        localStorage.setItem("dni", updatedData.dni);

        setIsEditable(false);
        setWarning(false);

        alert("Datos actualizados correctamente.");
        navigate("/home");
      } else {
        alert("Error: no se pudo actualizar el perfil.");
      }
    } catch (error) {
      console.error("Error al actualizar perfil:", error);
      alert(
        error.response?.data?.mensaje ||
          "Error inesperado al actualizar el perfil."
      );
    }
  };

  // Render especial para Admin con cartel y botón
  if (rol.toLowerCase() === "admin") {
    return (
      <div
        className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center"
        style={{ backgroundImage: `url(${fondoLogin})` }}
      >
        <div className="bg-white bg-opacity-90 p-8 rounded-xl shadow-lg w-full max-w-md text-center">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Mi Perfil</h2>
          <div className="border-2 border-red-500 bg-red-100 p-6 rounded-md text-red-700 font-semibold mb-6">
            <p>
              Como usuario administrador, para modificar tu perfil debes
              contactar al soporte de IT.
            </p>
          </div>
          <button
            onClick={() => navigate("/home")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-md transition duration-300"
          >
            Volver a Home
          </button>
        </div>
      </div>
    );
  }

  // Render para Academico o demás roles - formulario editable
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
            <label className="font-medium text-gray-700">Nombre y Apellido</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              disabled={!isEditable}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              maxLength={100}
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
                onClick={() => setWarning(true)}
                className="w-full bg-green-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-700 transition duration-300 mb-2"
              >
                Guardar Cambios
              </button>
              <button
                type="button"
                onClick={handleCancelEdit}
                className="w-full bg-gray-400 text-white font-semibold py-2 px-4 rounded-md hover:bg-gray-500 transition duration-300"
              >
                Cancelar
              </button>
              {warning && (
                <Warning
                  texto="¿Estás seguro que querés guardar los cambios?"
                  handleAccion={handleSaveChanges}
                  setWarning={setWarning}
                />
              )}
            </>
          )}
        </div>
      </div>
      {info && (
        <Info
          texto="El DNI debe tener entre 7 y 8 dígitos."
          rutaDestino="/perfil"
          setInfo={setInfo}
        />
      )}
    </div>
  );
};

export default Perfil;
