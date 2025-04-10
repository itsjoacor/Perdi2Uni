import React, { useState } from "react";
import axios from "axios";
import "../styles/registro.css";
import { useNavigate } from "react-router-dom";

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

      localStorage.setItem("userName", response.data);
      localStorage.setItem("isLoggedIn", "true");
      alert('Bienvenido de nuevo ' + response.data);
      navigate('/home');

    } catch (error) {

      const mensaje = error.response?.data;

      if (mensaje === "Correo no registrado") {
        alert('Correo no registrado');
      } else if (mensaje === "Contraseña incorrecta") {
        alert('Contraseña incorrecta');
      } else {
        console.error('Error al registrar:', error);
        alert('Error al registrar');
      }
    }
  };

  return (
    <div>
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
          placeholder="Contraseña"
          value={formData.contrasenia}
          onChange={handleChange}
          required
        />
        <button type="submit">Iniciar sesión</button>
        <button type="button" onClick={() => navigate('/registro')}>Crear una cuenta</button>
      </form>
    </div>
  );
};

export default Login;
