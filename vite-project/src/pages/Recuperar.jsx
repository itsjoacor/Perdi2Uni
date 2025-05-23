import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import fondoLogin from '../assets/fondos/fondoLogin.jpeg';

const Recuperar = () => {
  const navigate = useNavigate();
  const [correo, setCorreo] = useState('');
  const [dni, setDni] = useState('');
  const [validado, setValidado] = useState(false);
  const [nuevaContrasenia, setNuevaContrasenia] = useState('');
  const [repetirContrasenia, setRepetirContrasenia] = useState('');

  const handleValidar = async () => {
    try {
      const res = await axios.post('http://localhost:8080/academicos/validar-recuperacion', { correo, dni });
      setValidado(true);
    } catch (error) {
      alert(error.response?.data || 'Error al validar los datos');
    }
  };

  const handleActualizarContrasenia = async () => {
    if (nuevaContrasenia !== repetirContrasenia || nuevaContrasenia.trim() === '') {
      alert('Las contraseñas no coinciden o están vacías');
      return;
    }

    try {
      await axios.put('http://localhost:8080/academicos/nueva-contrasenia', {
        correo,
        nuevaContrasenia
      });
      alert('Contraseña actualizada con éxito');
      navigate('/');
    } catch (error) {
      alert(error.response?.data || 'Error al actualizar la contraseña');
    }
  };

  const handleCancelar = () => {
    navigate('/');
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${fondoLogin})` }}
    >
      <div className="bg-white bg-opacity-90 p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Recuperar Contraseña
        </h2>

        {!validado ? (
          <>
            <input
              type="email"
              placeholder="Correo electrónico"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
              className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="text"
              placeholder="DNI"
              value={dni}
              onChange={(e) => setDni(e.target.value)}
              required
              inputMode="numeric"
              maxLength={8}
              className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={handleValidar}
              className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
            >
              Validar datos
            </button>
          </>
        ) : (
          <>
            <input
              type="password"
              placeholder="Nueva contraseña"
              value={nuevaContrasenia}
              onChange={(e) => setNuevaContrasenia(e.target.value)}
              required
              className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="password"
              placeholder="Repetir nueva contraseña"
              value={repetirContrasenia}
              onChange={(e) => setRepetirContrasenia(e.target.value)}
              required
              className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <div className="flex gap-3">
              <button
                onClick={handleActualizarContrasenia}
                className="w-full bg-green-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-700 transition duration-300"
              >
                Generar nueva contraseña
              </button>
              <button
                onClick={handleCancelar}
                className="w-full bg-red-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-red-600 transition duration-300"
              >
                Cancelar
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Recuperar;
