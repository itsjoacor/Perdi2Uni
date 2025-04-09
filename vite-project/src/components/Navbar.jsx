import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  return (
    <nav className="bg-blue-700 text-white px-6 py-4 shadow-md flex justify-between items-center w-full">
      <h1 className="text-xl font-bold">Perdi2EnLaUni</h1>

      <div className="flex gap-6">
        <Link to="/home" className="hover:underline">
          Home
        </Link>
        <Link to="/publicar" className="hover:underline">
          Publicar una pérdida
        </Link>
        <Link to="/perfil" className="hover:underline">
          Editar perfil
        </Link>
        <button onClick={handleLogout} className="hover:underline">
          Cerrar sesión
        </button>
      </div>
    </nav>
  );
};

export default Navbar;