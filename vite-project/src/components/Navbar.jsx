import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <nav className="bg-blue-700 text-white px-6 py-4 shadow-md flex justify-between items-center w-full">
      <Link to="/home" className="text-xl font-bold hover:underline">
        Perdi2EnLaUni
      </Link>

      <div className="flex gap-6 items-center">
        <Link to="/publicar" className="hover:underline">
          Publicar una pérdida
        </Link>
        <button onClick={handleLogout} className="hover:underline">
          Cerrar sesión
        </button>
      </div>
    </nav>
  );
};

export default Navbar;