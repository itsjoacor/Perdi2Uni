import React, { useState } from "react";

const EstadoTag = ({ estado, id, onChange }) => {
  const [editing, setEditing] = useState(false);

  const estados = ["EN_BUSQUEDA", "ENCONTRADO", "EN_STAND_DE_OP"];

  const colorMap = {
    EN_BUSQUEDA: "bg-red-500",
    ENCONTRADO: "bg-orange-500",
    EN_STAND_DE_OP: "bg-green-600",
  };

  const handleChange = (e) => {
    const nuevoEstado = e.target.value;
    onChange(id, nuevoEstado);
    setEditing(false);
  };

  return editing ? (
    <select
      value={estado}
      onChange={handleChange}
      onBlur={() => setEditing(false)}
      className="px-2 py-1 rounded text-white font-semibold bg-gray-700"
    >
      {estados.map((opcion) => (
        <option key={opcion} value={opcion}>
          {opcion.replace(/_/g, " ")}
        </option>
      ))}
    </select>
  ) : (
    <span
      onClick={() => setEditing(true)}
      className={`cursor-pointer inline-flex items-center gap-1 text-white font-semibold px-3 py-1 rounded ${colorMap[estado] || "bg-gray-400"}`}
      title="Click para cambiar estado"
    >
      {estado.replace(/_/g, " ")}
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
      </svg>
    </span>
  );
};

export default EstadoTag;
