import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import fondoLogin from "../assets/fondos/fondoLogin.jpeg";
import NavbarAdmin from "../components/NavbarAdmin";
import Info from "../components/Info";
import axios from "axios";

const DardeBaja = () => {

      const [formData, setFormData] = useState("");
      const userName = localStorage.getItem("userName");
      const [sugerencias, setSugerencias] = useState([]);
      const [info, setInfo] = useState(false);
      const [infoTexto, setInfoTexto] = useState("");
      const [infoNavigate, setInfoNavigate] = useState("/dar-de-baja");
      const navigate = useNavigate();
  
      useEffect(() => {
          const delayDebounce = setTimeout(() => {
              if(formData.trim() !== "") {
                  axios.get(`http://localhost:8080/academicos/${formData}`)
                  .then((response) => {
                      setSugerencias(response.data);
                  })
                  .catch((error) => {
                      console.error("Error fetching data:", error);
                  });
              }
              else {
                  setSugerencias([]);
              }
          }
          , 100);
          return () => clearTimeout(delayDebounce);
      }, [formData]);
  
      const handleSeleccionCorreo = (correo) => {
          setFormData(correo);
          setSugerencias([]);
      };
  
      const darDeBajaUsuario = async (correo) => {
          if (correo.trim() === "") {
              setInfoTexto("No se puede dar de baja un usuario sin correo.");
              setInfo(true);
              return;
          }
  
          else {
              try {
                  await axios.delete(`http://localhost:8080/academicos/${formData}`);
                  setFormData("");
                  setInfoTexto("El usuario fue dado de baja correctamente.");
                  setInfoNavigate("/home");
                  setInfo(true);
              } catch(error) {
                  if (error.response && error.response.data) {
                      alert(error.response.data);
                      setFormData("");
                  }
              };
          }
      }
  
      return (
          <div className="min-h-screen bg-cover bg-center"
          style={{ backgroundImage: `url(${fondoLogin})` }}>
            {userName ? (
              <div>
              <NavbarAdmin />
                <div className="bg-white bg-opacity-90 p-8 rounded-xl shadow-lg w-full max-w-md justify-center align-center mx-auto mt-10">
                    <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                        Dada de baja de usuarios académicos
                    </h2>
                    <form className="space-y-4">
                        <input
                        type="email"
                        name="correo"
                        placeholder="Correo electrónico de usuario"
                        value={formData}
                        onChange={(e) => setFormData(e.target.value)}
                        required
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        autoComplete="off"
                        />
                        {sugerencias.length > 0 && !sugerencias.includes(formData) && (
                                <ul className="absolute z-10 w-auto bg-white border rounded-md shadow-md max-h-48 overflow-y-auto">
                                {sugerencias.map((correo) => (
                                    <li
                                    key={correo}
                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                    onClick={() => handleSeleccionCorreo(correo)}
                                    >
                                    {correo}
                                    </li>
                                ))}
                                </ul>
                            )}
                        <button
                        type="button"
                        onClick={() => darDeBajaUsuario(formData)}
                        className="w-full bg-red-200 text-red-800 font-semibold py-2 px-4 rounded-md hover:bg-red-300 transition duration-300"
                        >
                        Dar de baja
                        </button>
                    </form>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center min-h-screen">
                <div className="bg-white bg-opacity-70 backdrop-blur-md p-10 rounded-xl shadow-xl">
                  <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
                    <span className="bg-opacity-50 text-white px-3 py-1 rounded">
                      Tenés que ser administrador para poder realizar esta acción!
                    </span>
                  </h1>
                  <form className="w-full flex flex-col gap-4">
                    <button
                      type="submit"
                      className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200"
                      onClick={() => navigate("/")}
                    >
                      Iniciar Sesión
                    </button>
                  </form>
                </div>
              </div>
            )}
            {info && <Info texto={infoTexto} rutaDestino={infoNavigate} setInfo={setInfo}/>}
          </div>
  );
};

export default DardeBaja;
