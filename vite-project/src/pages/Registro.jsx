import React from "react";

import { useState } from 'react';
import axios from 'axios';
import '../styles/registro.css';

const Registro = () => {
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

    if (formDataCheck.correo !== formDataCheck.repetirCorreo) {
      alert('Los correos no coinciden');
      return
    }

    if (formDataCheck.contrasenia !== formDataCheck.repetirContrasenia) {
      alert('Las contraseñas no coinciden');
      return
    }

    setFormData(
        formData.nombre = formDataCheck.nombre, 
        formData.correo = formDataCheck.correo, 
        formData.dni = formDataCheck.dni, 
        formData.contrasenia = formDataCheck.contrasenia
    );

    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/perdi2enlauni/registro', formData);
      alert('Usuario registrado con éxito');
    } catch (error) {
      console.error('Error al registrar:', error);
      alert('Error al registrar');
    }

  };

  return (
    <div>
        <h2>Registro de Usuario</h2>
        <form onSubmit={handleSubmit}>
        <input
            type="text"
            name="nombre"
            placeholder="Nombrey Apellido"
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
            placeholder="Contrasenña"
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
        <button type="submit">Registrarse</button>
        </form>
    </div>
  );
}

export default Registro;
