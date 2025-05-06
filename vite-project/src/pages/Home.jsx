import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import NavbarAdmin from "../components/NavbarAdmin";
import { useNavigate } from "react-router-dom";
import fondoHome from "../assets/fondos/fondoHome.jpg";
import EstadoTag from "../components/EstadoTag";
import axios from "axios";

const Home = () => {
  const userName = localStorage.getItem("userName");
  const navigate = useNavigate();
  const userRol = localStorage.getItem("rol");
  const [data, setData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(""); // Fecha de inicio
  const [selectedStatus, setSelectedStatus] = useState(""); // Estado seleccionado
  const [noDataMessage, setNoDataMessage] = useState(""); // Mensaje de no datos

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

  useEffect(() => {
    let url = "http://localhost:8080/publicaciones/";

    // Reset the noDataMessage before each request
    setNoDataMessage("");

    // Hacer solicitudes separadas según los filtros seleccionados
    if (selectedDate && selectedStatus) {
      // Filtro combinado (fecha y estado)
      url = `http://localhost:8080/publicaciones/filtroCombinado?fecha=${selectedDate}&estado=${selectedStatus}`;
    } else if (selectedDate) {
      // Filtro solo por fecha
      url = `http://localhost:8080/publicaciones/filtroFecha?fecha=${selectedDate}`;
    } else if (selectedStatus) {
      // Filtro solo por estado
      url = `http://localhost:8080/publicaciones/filtroEstado?estado=${selectedStatus}`;
    }

    axios
      .get(url)
      .then((response) => {
        setData(response.data);

        // Verificar si no hay datos y mostrar el mensaje correspondiente
        if (response.data.length === 0) {
          if (selectedDate && !selectedStatus) {
            setNoDataMessage("Aun no hay publicaciones para la fecha seleccionada.");
          } else if (!selectedDate && selectedStatus) {
            setNoDataMessage("Aun no hay publicaciones para el estado seleccionado.");
          } else if (selectedDate && selectedStatus) {
            setNoDataMessage("Aun no hay publicaciones para la combinacion de fecha y estado seleccionados.");
          } else {
            setNoDataMessage("Aún no hay publicaciones para mostrar.");
          }
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [selectedDate, selectedStatus]);

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
              <option value="RECUPERADO">Stand de OP</option>
            </select>
          </div>

          {noDataMessage ? (
            <div className="mt-6 bg-white shadow-md rounded-lg p-6 text-center text-gray-700 w-150 max-w-md mx-auto">
              {noDataMessage}
            </div>
          ) : (
            <div className="mt-6 bg-white shadow-md rounded-lg p-6 text-gray-700 w-full max-w-5xl mx-auto overflow-x-auto">
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
                      <th className="px-6 py-4">LUGAR DE EXTRAVÍO</th>
                      <th className="px-6 py-4 w-52">ESTADO</th>
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
                                  : item.estadoDePublicacion ===
                                    "RECUPERADO"
                                  ? "bg-green-600"
                                  : "bg-gray-400"
                              }`}
                            >
                              {item.estadoDePublicacion.replace(/_/g, " ")}
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
    </div>
  );
};

export default Home;
