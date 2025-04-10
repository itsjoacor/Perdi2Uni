import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import fondoLogin from '../styles/images/homeImage.jpeg';

const Registro = () => {
  const navigate = useNavigate();

  const [formDataCheck, setFormDataCheck] = useState({
    nombre: '',
    correo: '',
    repetirCorreo: '',
    dni: '',
    contrasenia: '',
    repetirContrasenia: ''
  });

  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    dni: '',
    contrasenia: ''
  });

  const handleChange = (e) => {
    setFormDataCheck(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formDataCheck.correo !== formDataCheck.repetirCorreo) {
      alert('Los correos no coinciden');
      return;
    }

    if (formDataCheck.contrasenia !== formDataCheck.repetirContrasenia) {
      alert('Las contraseñas no coinciden');
      return;
    }

    const newFormData = {
      nombre: formDataCheck.nombre,
      correo: formDataCheck.correo,
      dni: formDataCheck.dni,
      contrasenia: formDataCheck.contrasenia
    };

    setFormData(newFormData);

    try {
      await axios.post('http://localhost:8080/perdi2enlauni/registro', newFormData);
      localStorage.setItem('userName', newFormData.nombre);
      alert('Usuario registrado con éxito');
      navigate('/home');
    } catch (error) {
      console.error('Error al registrar:', error);

      if (error.response && error.response.data) {
        alert(error.response.data); // "El correo ya está registrado" o "El DNI ya está registrado"
      } else {
        alert('Error al registrar');
      }
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${fondoLogin})` }}
    >
      <div className="bg-white bg-opacity-90 p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Registro de Usuario</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="nombre"
            placeholder="Nombre y Apellido"
            value={formDataCheck.nombre}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="email"
            name="correo"
            placeholder="Correo electrónico"
            value={formDataCheck.correo}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="email"
            name="repetirCorreo"
            placeholder="Repetir correo electrónico"
            value={formDataCheck.repetirCorreo}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            name="dni"
            placeholder="DNI"
            value={formDataCheck.dni}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            name="contrasenia"
            placeholder="Contraseña"
            value={formDataCheck.contrasenia}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            name="repetirContrasenia"
            placeholder="Repetir contraseña"
            value={formDataCheck.repetirContrasenia}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
};

export default Registro;
