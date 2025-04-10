import React from "react";
import { useState } from 'react';
import axios from 'axios';
import '../styles/registro.css';
import { useNavigate } from 'react-router-dom';

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
        await axios.post('http://localhost:8080/perdi2enlauni/login', formData);
        alert('Bienvenido');
        navigate('/home');
      } catch (error) {
        console.error('Error al iniciar sesión:', error);
        alert('Error al iniciar sesión');
      }

    };

    return (
      <div>
          <h2>Registro de Usuario</h2>
          <form onSubmit={handleSubmit}>
          <input
              type="email"
              name="correo"
              placeholder="Correo electrónico"
              value={formData.correo}
              onChange={handleChange}
              required
          />
          <input
              type="password"
              name="contrasenia"
              placeholder="Contrasenña"
              value={formData.contrasenia}
              onChange={handleChange}
              required
          />
          <button type="submit">Inicar sesión</button>
          </form>
      </div>
    );
};
export default Login;