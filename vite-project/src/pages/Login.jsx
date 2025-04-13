import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import fondoLogin from '../assets/fondos/fondoLogin.jpeg';

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    correo: '',
    contrasenia: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('http://localhost:8080/academicos/login', formData);
        alert('Hola ' + response.data + '!');
        localStorage.setItem('userName', response.data);
        navigate('/home');
    } catch (error) {
      console.error('Error al iniciar sesión:', error);

      if (error.response && error.response.data) {
        alert(error.response.data); // "El correo ya está registrado" o "El DNI ya está registrado"
      } else {
        alert('Error al iniciar sesión');
      }
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${fondoLogin})` }}
    >
      <div className="bg-white bg-opacity-70 backdrop-blur-md p-10 rounded-xl shadow-xl w-80 flex flex-col items-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
          <span className="bg-black bg-opacity-50 text-white px-3 py-1 rounded">
            Perdi2EnLaUni
          </span>
        </h1>
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <input
            type="email"
            name="correo"
            placeholder="Correo electrónico"
            value={formData.correo}
            onChange={handleChange}
            required
            className="p-3 rounded border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            name="contrasenia"
            placeholder="Contraseña"
            value={formData.contrasenia}
            onChange={handleChange}
            required
            className="p-3 rounded border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200"
          >
            Iniciar Sesión
          </button>
        </form>
        <div className="mt-4 flex flex-col gap-2 text-sm text-blue-700">
          <button
            type="button"
            onClick={() => navigate('/recuperar')}
            className="hover:underline"
          >
            Recuperar Contraseña
          </button>
          <button
            type="button"
            onClick={() => navigate('/registro')}
            className="hover:underline"
          >
            Registrarse
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
