import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import NavbarAdmin from "../components/NavbarAdmin";
import { useNavigate } from "react-router-dom";
import fondoHome from "../assets/fondos/fondoHome.jpg";
import EstadoTag from "../components/EstadoTag";
import Info from "../components/Info";
import Warning from "../components/Warning";
import axios from "axios";

const MisPublicaciones = () => {
  const userName = localStorage.getItem("userName");
  const navigate = useNavigate();
  const userRol = localStorage.getItem("rol");
  const [info, setInfo] = useState(false);
  const [warning, setWarning] = useState(false);
  const [data, setData] = useState([]);
  const [noDataMessage, setNoDataMessage] = useState(""); // Message when no data is available
  const correoDelUsuario = localStorage.getItem("correo"); // Get the correo from localStorage
  const [postToDelete, setPostToDelete] = useState(null); // Store post ID for deletion

  const handleEstadoChange = async (id, nuevoEstado) => {
    try {
      await axios.put(
        `http://localhost:8080/publicaciones/${id}/estado`,
        nuevoEstado,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setData((prevData) =>
        prevData.map((item) =>
          item.id === id ? { ...item, estadoDePublicacion: nuevoEstado } : item
        )
      );
    } catch (error) {
      console.error("Error al cambiar el estado:", error);
    }
  };

  const handleDeleteConfirmation = (id) => {
    setPostToDelete(id);
    setWarning(true);
  };

  const handleDelete = async () => {
    try {
      // Send DELETE request to backend to delete the post
      await axios.delete(
        `http://localhost:8080/publicaciones/eliminar/${postToDelete}`
      );

      // Refresh the list after deletion
      setData((prevData) =>
        prevData.filter((item) => item.id !== postToDelete)
      );

      // If no more data is available, show the "no posts" message
      if (data.length === 1) {
        setNoDataMessage("Aún no hay publicaciones para mostrar");
      }
      setInfo(true);
    } catch (error) {
      console.error("Error al eliminar publicación:", error);
      alert("Error al eliminar la publicación.");
    }
  };

  useEffect(() => {
    // Make GET request and pass correo as query parameter
    axios
      .get(
        `http://localhost:8080/publicaciones/publicacionesUsuario?correo=${correoDelUsuario}`
      )
      .then((response) => {
        setData(response.data);

        if (response.data.length === 0) {
          setNoDataMessage("Aún no hay publicaciones para mostrar");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [correoDelUsuario]);

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${fondoHome})` }}
    >
      {userName ? (
        <div>
          {userRol === "admin" ? <NavbarAdmin /> : <Navbar />}

          {noDataMessage ? (
            <div className="mt-6 bg-white shadow-md rounded-lg p-6 text-center text-gray-700 w-150 max-w-md mx-auto">
              {noDataMessage}
            </div>
          ) : (
            <div className="mt-6 bg-white shadow-md rounded-lg p-6 text-gray-700 w-full max-w-7xl mx-auto overflow-x-auto">
              <div
                className="max-h-[500px] overflow-y-auto"
                style={{ maxHeight: "300px", display: "block" }}
              >
                <table className="table-auto w-full text-center">
                  <thead className="sticky top-0 bg-blue-200">
                    <tr>
                      <th className="px-6 py-4">FECHA</th>
                      <th className="px-6 py-4">NOMBRE</th>
                      <th className="px-6 py-4">CORREO</th>
                      <th className="px-6 py-4">DESCRIPCIÓN</th>
                      <th className="px-6 py-4">UNIVERSIDAD</th>
                      <th className="px-6 py-4">LUGAR DE EXTRAVÍO</th>
                      <th className="px-6 py-4 w-52">ESTADO</th>
                      <th className="px-6 py-4 w-24">ACCIONES</th>{" "}
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item, index) => (
                      <tr key={index} className="border-b">
                        <td className="px-6 py-4">
                          {new Date(item.fecha).toISOString().split("T")[0]}
                        </td>
                        <td className="px-6 py-4">{item.academico.nombre}</td>
                        <td className="px-6 py-4">{item.academico.correo}</td>
                        <td className="px-6 py-4">{item.descripcion}</td>
                        <td className="px-6 py-4">
                          {item.universidad ===
                          "UNIVERSIDAD_NACIONAL_ARTURO_JAURETCHE"
                            ? "UNAJ"
                            : item.universidad ===
                              "UNIVERSIDAD_NACIONAL_DE_QUILMES"
                            ? "UNQ"
                            : item.universidad ===
                              "UNIVERSIDAD_TECNICA_NACIONAL"
                            ? "UTN"
                            : "No encontrado"}
                        </td>
                        <td className="px-6 py-4">
                          {item.lugarDeExtravio || "No especificado"}
                        </td>
                        <td className="px-6 py-4">
                          {userRol === "admin" ? (
                            <EstadoTag
                              estado={item.estadoDePublicacion}
                              id={item.id}
                              onChange={handleEstadoChange}
                            />
                          ) : (
                            <span
                              className={`text-white font-semibold px-3 py-1 rounded ${
                                item.estadoDePublicacion === "EN_BUSQUEDA"
                                  ? "bg-red-500"
                                  : item.estadoDePublicacion === "LOCALIZADO"
                                  ? "bg-orange-500"
                                  : item.estadoDePublicacion ===
                                    "EN_STAND_DE_OP"
                                  ? "bg-violet-600"
                                  : item.estadoDePublicacion === "RECUPERADO"
                                  ? "bg-green-600"
                                  : "bg-gray-400"
                              }`}
                            >
                              {item.estadoDePublicacion.replace(/_/g, " ")}
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => handleDeleteConfirmation(item.id)} // Show the confirmation modal
                            className="text-red-500 hover:text-red-700"
                          >
                            🗑️
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {warning && (
            <Warning
              texto="¿Estás seguro que querés eliminar esta publicación?"
              handleAccion={handleDelete}
              setWarning={setWarning}
            />
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <div className="bg-white bg-opacity-70 backdrop-blur-md p-10 rounded-xl shadow-xl">
            <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
              <span className="bg-opacity-50 text-white px-3 py-1 rounded">
                Tenés que estar loggeado para poder realizar una publicación!
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
      {info && (
        <Info
          texto={"Publicación eliminada correctamente"}
          rutaDestino="/misPublicaciones"
          setInfo={setInfo}
        />
      )}
    </div>
  );
};

export default MisPublicaciones;
