import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import fondoLogin from '../styles/images/homeImage.jpeg';

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
      const response = await axios.post('http://localhost:8080/perdi2enlauni/login', formData);
      if (response.data === '') {
        alert('Credenciales incorrectas');
        return;
      } else {
        alert('Hola ' + response.data + '!');
        localStorage.setItem('userName', response.data);
        navigate('/home');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      alert('Error al iniciar sesión');
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center"
      style={{ backgroundImage: `url(${fondoLogin})`
      }}
    >
      <h1 className="text-6xl font-extrabold text-white shadow-x1 mb-10 font-[calibri] bg-black bg-opacity-50 px-6 py-2 rounded-lg">
        Perdi2EnLaUni
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg flex flex-col gap-4 w-80"
      >
        <input
          type="email"
          name="correo"
          placeholder="Correo electrónico"
          value={formData.correo}
          onChange={handleChange}
          required
          className="p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="password"
          name="contrasenia"
          placeholder="Contraseña"
          value={formData.contrasenia}
          onChange={handleChange}
          required
          className="p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200"
        >
          Iniciar Sesión
        </button>
        <button
          type="button"
          onClick={() => navigate('/recuperar')}
          className="text-sm text-blue-600 hover:underline"
        >
          Recuperar Contraseña
        </button>
        <button
          type="button"
          onClick={() => navigate('/registro')}
          className="text-sm text-blue-600 hover:underline"
        >
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default Login;