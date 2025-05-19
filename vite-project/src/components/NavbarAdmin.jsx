import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const NavbarAdmin = () => {
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
	<nav className="relative bg-purple-700 text-white px-6 py-4 shadow-md flex justify-between items-center w-full">
	  {/* Logo a la izquierda */}
    <Link to="/home" className="flex items-center">
			<svg
			  xmlns="http://www.w3.org/2000/svg"
			  fill="none"
			  viewBox="0 0 24 24"
			  strokeWidth="1.5"
			  stroke="currentColor"
			  style={{ width: "37px", height: "37px" }}
			>
			  <path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
			  />
			</svg>
		  </Link>
	
	<nav className="absolute left-1/2 transform -translate-x-1/2">
        <h1 className="text-2xl font-bold whitespace-nowrap">Perdi2EnLaUni</h1>
      </nav>

	  <div className="flex items-center divide-x divide-white">
	  <Link to="/publicar" className="px-4 hover:underline whitespace-nowrap">
					Publicar una pérdida
				</Link>
				<Link to="/dar-de-baja" className="px-4 hover:underline whitespace-nowrap">
					Dar de baja usuarios
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
			  <ul className="absolute z-[9999] right-0 mt-2 w-40 bg-white text-black rounded-lg shadow-lg">
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

export default NavbarAdmin;
