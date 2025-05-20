import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import NavbarAdmin from "../components/NavbarAdmin";
import { useNavigate } from "react-router-dom";
import fondoHome from "../assets/fondos/fondoHome.jpg";
import EstadoTag from "../components/EstadoTag";
import Info from "../components/Info"
import axios from "axios";

const Home = () => {
  const userName = localStorage.getItem("userName");
  const navigate = useNavigate();
  const userRol = localStorage.getItem("rol");
  const [info, setInfo] = useState(false);
  const [data, setData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(""); // Fecha de inicio
  const [selectedStatus, setSelectedStatus] = useState(""); // Estado seleccionado
  const [selectedUni, setSelectedUni] = useState(""); // Universidad seleccionada
  const [noDataMessage, setNoDataMessage] = useState(""); // Mensaje de no datos
  const [cantPublicacionesRecuperadas, setCantPublicacionesRecuperadas] =
    useState(0); // Cantidad de publicaciones recuperadas

  // Estados para modal de eliminación
  const [showModal, setShowModal] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);

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

      fetchCantPublicacionesRecuperadas();
    } catch (error) {
      console.error("Error al cambiar el estado:", error);
    }
  };

  const fetchCantPublicacionesRecuperadas = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/publicaciones/cantPublicacionesRecuperadas`
      );
      setCantPublicacionesRecuperadas(response.data);
    } catch (error) {
      console.error(
        "Error fetching cantidad de publicaciones recuperadas:",
        error
      );
    }
  };

  // Función para abrir modal y guardar id a eliminar
  const handleDeleteConfirmation = (id) => {
    setPostToDelete(id);
    setShowModal(true);
  };

  // Función para confirmar eliminación
  const handleDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:8080/publicaciones/eliminar/${postToDelete}`
      );
      setData((prevData) =>
        prevData.filter((item) => item.id !== postToDelete)
      );
      setShowModal(false);
      setInfo(true);

      if (data.length === 1) {
        setNoDataMessage("Aún no hay publicaciones para mostrar.");
      }

      fetchCantPublicacionesRecuperadas();
    } catch (error) {
      console.error("Error al eliminar la publicación:", error);
      alert("Error al eliminar la publicación.");
    }
  };

  // Cancelar cierre modal
  const handleModalClose = () => {
    setShowModal(false);
  };

  useEffect(() => {
    fetchCantPublicacionesRecuperadas();
  }, []);

  useEffect(() => {
    let url = "http://localhost:8080/publicaciones/";

    setNoDataMessage("");

    if (selectedDate && selectedStatus && selectedUni) {
      url = `http://localhost:8080/publicaciones/filtroCombinadoConUniversidad?fecha=${selectedDate}&estado=${selectedStatus}&universidad=${selectedUni}`;
    } else if (selectedDate && selectedStatus) {
      url = `http://localhost:8080/publicaciones/filtroCombinado?fecha=${selectedDate}&estado=${selectedStatus}`;
    } else if (selectedDate && selectedUni) {
      url = `http://localhost:8080/publicaciones/filtroFechaYUni?fecha=${selectedDate}&universidad=${selectedUni}`;
    } else if (selectedStatus && selectedUni) {
      url = `http://localhost:8080/publicaciones/filtroEstadoYUni?estado=${selectedStatus}&universidad=${selectedUni}`;
    } else if (selectedDate) {
      url = `http://localhost:8080/publicaciones/filtroFecha?fecha=${selectedDate}`;
    } else if (selectedStatus) {
      url = `http://localhost:8080/publicaciones/filtroEstado?estado=${selectedStatus}`;
    } else if (selectedUni) {
      url = `http://localhost:8080/publicaciones/filtroUniversidad?universidad=${selectedUni}`;
    }

    axios
      .get(url)
      .then((response) => {
        setData(response.data);

        if (response.data.length === 0) {
          if (selectedDate && !selectedStatus && !selectedUni) {
            setNoDataMessage(
              "Aún no hay publicaciones para la fecha seleccionada."
            );
          } else if (!selectedDate && selectedStatus && !selectedUni) {
            setNoDataMessage(
              "Aún no hay publicaciones para el estado seleccionado."
            );
          } else if (!selectedDate && !selectedStatus && selectedUni) {
            setNoDataMessage(
              "Aún no hay publicaciones para la universidad seleccionada."
            );
          } else if (selectedDate && selectedStatus && !selectedUni) {
            setNoDataMessage(
              "Aún no hay publicaciones para la combinación de fecha y estado seleccionados."
            );
          } else if (selectedDate && !selectedStatus && selectedUni) {
            setNoDataMessage(
              "Aún no hay publicaciones para la combinación de fecha y universidad seleccionadas."
            );
          } else if (!selectedDate && selectedStatus && selectedUni) {
            setNoDataMessage(
              "Aún no hay publicaciones para la combinación de estado y universidad seleccionadas."
            );
          } else if (selectedDate && selectedStatus && selectedUni) {
            setNoDataMessage(
              "Aún no hay publicaciones para la combinación de fecha, estado y universidad seleccionados."
            );
          } else {
            setNoDataMessage("Aún no hay publicaciones para mostrar.");
          }
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [selectedDate, selectedStatus, selectedUni]);

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${fondoHome})` }}
    >
      {userName ? (
        <div>
          {userRol === "admin" ? <NavbarAdmin /> : <Navbar />}

          {/* Filtros en la misma línea */}
          <div className="mt-6 flex justify-center space-x-4">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              max={new Date().toISOString().split("T")[0]}
              className="border rounded-md px-4 py-2"
            />
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="border rounded-md px-4 py-2"
            >
              <option value="">Seleccione Estado</option>
              <option value="EN_BUSQUEDA">En búsqueda</option>
              <option value="LOCALIZADO">Localizado</option>
              <option value="EN_STAND_DE_OP">Stand de OP</option>
              <option value="RECUPERADO">Recuperado</option>
            </select>
            <select
              value={selectedUni}
              onChange={(e) => setSelectedUni(e.target.value)}
              className="border rounded-md px-4 py-2"
            >
              <option value="">Seleccione Universidad</option>
              <option value="UNIVERSIDAD_NACIONAL_ARTURO_JAURETCHE">
                UNAJ
              </option>
              <option value="UNIVERSIDAD_NACIONAL_DE_QUILMES">UNQ</option>
              <option value="UNIVERSIDAD_TECNICA_NACIONAL">UTN</option>
            </select>
          </div>

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
                      {userRol === "admin" && (
                        <th className="px-6 py-4 w-24">ACCION</th>
                      )}
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
                        {userRol === "admin" && (
                          <td className="px-6 py-4 text-center cursor-pointer">
                            <button
                              onClick={() => handleDeleteConfirmation(item.id)}
                              aria-label="Eliminar publicación"
                              className="text-red-600 hover:text-red-800 focus:outline-none transition-colors duration-200"
                              title="Eliminar publicación"
                            >
                              🗑️
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4m-4 0a1 1 0 00-1 1v1h6V4a1 1 0 00-1-1m-4 0h4"
                              />
                            </button>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <div className="fixed bottom-4 left-4 bg-emerald-500/80 text-white px-3 py-1 rounded-lg shadow-md flex items-center gap-2">
            <p className="font-semibold">
              {cantPublicacionesRecuperadas} Pertenencias ya fueron devueltas
              gracias a Perdi2EnLaUni
            </p>
          </div>

          {/* Modal de confirmación de eliminación */}
          {showModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-white p-8 rounded-lg shadow-xl w-96">
                <h2 className="text-2xl font-semibold mb-4">
                  Confirmar Eliminación
                </h2>
                <p>¿Estás seguro de que deseas eliminar esta publicación?</p>
                <div className="mt-4 flex justify-between">
                  <button
                    onClick={handleDelete}
                    className="bg-red-500 text-white py-2 px-4 rounded-md"
                  >
                    Confirmar
                  </button>
                  <button
                    onClick={handleModalClose}
                    className="bg-gray-500 text-white py-2 px-4 rounded-md"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
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
                type="button"
                className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200"
                onClick={() => navigate("/")}
              >
                Iniciar Sesión
              </button>
            </form>
          </div>
        </div>
      )}
      {info && <Info texto={"Publicación eliminada correctamente"} rutaDestino="/home" setInfo={setInfo} />}
    </div>
  );
};

export default Home;
