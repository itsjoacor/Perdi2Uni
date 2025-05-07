import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem("userName");
  const [showConfirm, setShowConfirm] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // State to manage dropdown visibility
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userName");
    localStorage.removeItem("dni");
    localStorage.removeItem("rol");
    localStorage.removeItem("correo");
    localStorage.removeItem("contrasenia");
    navigate("/");
  };

  const handleBajaDelUsuario = () => {
    setIsDropdownOpen(false);
    setShowConfirm(true);
  };

  const confirmarBaja = async () => {
    if (password === localStorage.getItem("contrasenia")) {
      const correo = localStorage.getItem("correo");
      await axios.delete(`http://localhost:8080/academicos/${correo}`);
      alert("El usuario fue dado de baja correctamente.");
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("userName");
      localStorage.removeItem("dni");
      localStorage.removeItem("rol");
      localStorage.removeItem("correo");
      localStorage.removeItem("contrasenia");
      navigate("/");
    } else {
      setError("Contraseña incorrecta.");
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div>
      <nav className="bg-blue-700 text-white px-6 py-4 shadow-md flex justify-between items-center w-full">
        <Link to="/home">
          <h1 className="text-xl font-bold whitespace-nowrap">Perdi2EnLaUni</h1>
        </Link>

        <div className="flex items-center divide-x divide-white">
          <Link
            to="/publicar"
            className="px-4 hover:underline whitespace-nowrap"
          >
            Publicar una pérdida
          </Link>

          {userName && (
            <div className="relative">
              {/* Profile button */}
              <button
                onClick={toggleDropdown}
                className="px-4 hover:underline whitespace-nowrap"
              >
                Mi Perfil
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
                  <li>
                    <button
                      onClick={handleBajaDelUsuario}
                      className="block px-4 py-2 text-sm w-full text-red-400 text-left bg-gray-900 hover:bg-gray-800"
                    >
                      Darse de baja
                    </button>
                  </li>
                </ul>
              )}
            </div>
          )}
        </div>
      </nav>
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
          <div className="bg-gray-900 text-white rounded-xl shadow-xl w-80 h-80 flex flex-col justify-between p-5 border border-red-700">
            <div>
              <h3 className="font-bold text-lg mb-2 text-center text-red-500">
                Confirmar eliminación
              </h3>
              <p className="text-sm mb-4 text-center text-gray-300">
                Esta acción no se puede deshacer. Ingrese su contraseña para
                confirmar.
              </p>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 border border-red-500 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600"
                placeholder="Contraseña"
              />
              {error && (
                <p className="text-red-400 text-sm mt-2 text-center">{error}</p>
              )}
            </div>
            <div className="flex justify-around mt-4">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600"
              >
                Cancelar
              </button>
              <button
                onClick={confirmarBaja}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
