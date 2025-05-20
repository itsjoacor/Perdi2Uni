import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import fondoLogin from '../assets/fondos/fondoLogin.jpeg';
import Info from "../components/Info";

const Registro = () => {
  const navigate = useNavigate();

  const [info, setInfo] = useState(false);
  const [infoTexto, setInfoTexto] = useState("");
  const [infoNavigate, setInfoNavigate] = useState("/registro");
  

  const [formDataCheck, setFormDataCheck] = useState({
    nombre: '',
    correo: '',
    repetirCorreo: '',
    dni: '',
    contrasenia: '',
    repetirContrasenia: ''
  });

  const handleChange = (e) => {
    setFormDataCheck(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const validarDNI = (dni) => {
    const dniRegex = /^\d{7,8}$/;
    return dniRegex.test(dni);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { nombre, correo, repetirCorreo, dni, contrasenia, repetirContrasenia } = formDataCheck;

    if (correo !== repetirCorreo) {
      setInfoTexto("Los correos no coinciden");
      setInfo(true);
      return;
    }

    if (contrasenia !== repetirContrasenia) {
      setInfoTexto("Las contraseñas no coinciden");
      setInfo(true);
      return;
    }

    if (!validarDNI(dni)) {
      setInfoTexto("Ingrese un número de DNI válido");
      setInfo(true);
      return;
    }

    const newFormData = { nombre, correo, dni, contrasenia };

    try {
      localStorage.setItem('rol', "academico")
      await axios.post('http://localhost:8080/academicos/registro', newFormData);
      localStorage.setItem('userName', nombre);
      localStorage.setItem('dni', dni)
      localStorage.setItem('correo', correo)
      localStorage.setItem('contrasenia', contrasenia)
      setInfoTexto("Usuario registrado con éxito");
      setInfoNavigate("/home");
      setInfo(true);
    } catch (error) {
      console.error('Error al registrar:', error);
      if (error.response && error.response.data) {
        alert(error.response.data);
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
            inputMode="numeric"
            maxLength={8}
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
      {info && <Info texto={infoTexto} rutaDestino={infoNavigate} setInfo={setInfo} />}
    </div>
  );
};

export default Registro;
