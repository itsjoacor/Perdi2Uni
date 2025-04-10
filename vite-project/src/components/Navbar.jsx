import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem("userName");

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userName");
    navigate("/");
  };

  return (
    <nav className="bg-blue-700 text-white px-6 py-4 shadow-md flex justify-between items-center w-full">
      <Link to="/home">
        <h1 className="text-xl font-bold whitespace-nowrap">Perdi2EnLaUni</h1>
      </Link>

      <div className="flex items-center divide-x divide-white">
        <Link to="/publicar" className="px-4 hover:underline whitespace-nowrap">
          Publicar una pérdida
        </Link>

        {userName && (
          <span className="px-4 whitespace-nowrap"> {userName} </span>
        )}

        <div className="px-4 whitespace-nowrap">
          <button
            onClick={handleLogout}
            className="hover:underline whitespace-nowrap"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
