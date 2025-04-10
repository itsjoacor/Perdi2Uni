import React from "react";
import { useState } from 'react';
import axios from 'axios';
import '../styles/registro.css';
import { useNavigate } from "react-router-dom";

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

    if(!formDataCheck.nombre || !formDataCheck.correo || !formDataCheck.dni || !formDataCheck.contrasenia) {
      alert('Por favor complete todos los campos');
      return
    }

    if (formDataCheck.correo !== formDataCheck.repetirCorreo) {
      alert('Los correos no coinciden');
      return
    }

    if (formDataCheck.contrasenia !== formDataCheck.repetirContrasenia) {
      alert('Las contraseñas no coinciden');
      return
    }
    
    try {

      setFormData({
        nombre: formDataCheck.nombre,
        correo: formDataCheck.correo,
        dni: formDataCheck.dni,
        contrasenia: formDataCheck.contrasenia,
      });

      await axios.post('http://localhost:8080/perdi2enlauni/registro', formData);
      alert('Usuario registrado con éxito');
      navigate('/');

    } catch (error) {

      const mensaje = error.response?.data;
    
      if (mensaje === "El correo ya está registrado") {

        alert('El correo ya está registrado');

      } else if (mensaje === "El DNI ya está registrado") {

        alert('El DNI ya está registrado');

      } else {
        console.error('Error al registrar:', error);
        alert('Error al registrar');
      }

    }

  };

  return (
    <div>
        <h2>Registro de Usuario</h2>
        <form onSubmit={handleSubmit}>
        <input
            type="text"
            name="nombre"
            placeholder="Nombre y Apellido"
            value={formDataCheck.nombre}
            onChange={handleChange}
            required
        />
        <input
            type="email"
            name="correo"
            placeholder="Correo electrónico"
            value={formDataCheck.correo}
            onChange={handleChange}
            required
        />
        <input
            type="email"
            name="repetirCorreo"
            placeholder="Repetir correo electrónico"
            value={formDataCheck.repetirCorreo}
            onChange={handleChange}
            required
        />
        <input
            type="text"
            name="dni"
            placeholder="DNI"
            value={formDataCheck.dni}
            onChange={handleChange}
            required
        />
        <input
            type="password"
            name="contrasenia"
            placeholder="Contraseña"
            value={formDataCheck.contrasenia}
            onChange={handleChange}
            required
        />
        <input
            type="password"
            name="repetirContrasenia"
            placeholder="Repetir contraseña"
            value={formDataCheck.repetirContrasenia}
            onChange={handleChange}
            required
        />
        <button type="submit">Crear cuenta</button>
        </form>
    </div>
  );
}

export default Registro;
