import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem("userName");
  const rol = localStorage.getItem("rol");

  // State to manage dropdown visibility
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userName");
    localStorage.removeItem("dni");
    localStorage.removeItem("rol");
    navigate("/");
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
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
          <div className="relative">
            {/* Profile button */}
            <button
              onClick={toggleDropdown}
              className="px-4 hover:underline whitespace-nowrap"
            >
              Perfil {rol}
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <ul className="absolute right-0 mt-2 w-40 bg-white text-black rounded-lg shadow-lg">
                <li>
                  <Link
                    to="/perfil"
                    className="block px-4 py-2 text-sm hover:bg-blue-200"
                  >
                    Mis datos
                  </Link>
                </li>
                <li>
                  <Link
                    to="/misPublicaciones"
                    className="block px-4 py-2 text-sm hover:bg-blue-200"
                  >
                    Mis publicaciones
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="block px-4 py-2 text-sm w-full text-left hover:bg-blue-200"
                  >
                    Cerrar sesión
                  </button>
                </li>
              </ul>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
