"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";

export default function EditarTardanza({ textButton = "Editar tardanza" }) {
  // Estudiantes simulados
  const students = {
    "2024-0112": { name: "Juan Gabriel", curso: "5toF" },
    "2025-0112": { name: "Ana María", curso: "5toE" },
    "2023-0112": { name: "Luis Pérez", curso: "3roA" },
  };

  // Estado
  const [matricula, setMatricula] = useState("");
  const [nombre, setNombre] = useState("");
  const [curso, setCurso] = useState("");
  const [rows, setRows] = useState([
    {
      id: 1,
      matricula: "2024-0112",
      nombre: "Juan Gabriel",
      curso: "5toF",
      dia: "23/07/2025",
      justificacion: "Ninguna",
    },
    {
      id: 2,
      matricula: "2024-0112",
      nombre: "Juan Gabriel",
      curso: "5toF",
      dia: "25/07/2025",
      justificacion: "Médica",
    },
    {
      id: 3,
      matricula: "2025-0112",
      nombre: "Ana María",
      curso: "5toE",
      dia: "26/07/2025",
      justificacion: "Transporte",
    },
  ]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [nuevaJustificacion, setNuevaJustificacion] = useState("");
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");

  // Autocompletar datos según matrícula
  useEffect(() => {
    const pattern = /^\d{4}-\d{4}$/;
    if (pattern.test(matricula)) {
      const found = students[matricula];
      if (found) {
        setNombre(found.name);
        setCurso(found.curso);
        setError("");
      } else {
        setNombre("No encontrado");
        setCurso("");
      }
    } else {
      setNombre("");
      setCurso("");
      if (matricula.length > 0) setError("Formato: AAAA-XXXX");
      else setError("");
    }
  }, [matricula]);

  // Filtrar tardanzas según matrícula
  const filteredRows = rows.filter((r) =>
    r.matricula.toLowerCase().includes(matricula.toLowerCase())
  );

  // Actualizar justificación
  const handleActualizar = () => {
    if (!selectedRow || !nuevaJustificacion) {
      return setError("Selecciona una tardanza y una justificación.");
    }
    setRows((prev) =>
      prev.map((r) =>
        r.id === selectedRow.id
          ? { ...r, justificacion: nuevaJustificacion }
          : r
      )
    );
    setMensaje("✅ Tardanza actualizada correctamente.");
    setSelectedRow(null);
    setNuevaJustificacion("");
    setTimeout(() => setMensaje(""), 3000);
  };

  return (
    <div className="w-240 mx-auto p-6 rounded-2xl bg-[#ffffff]/50 border border-gray-400/30 backdrop-blur-2xl text-gray-900">
      {/* Input de búsqueda por matrícula */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block mb-2 text-sm font-medium">Matrícula</label>
          <Input
            value={matricula}
            onChange={(e) => setMatricula(e.target.value)}
            placeholder="2025-0140"
            className="glass-input"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium">Nombre</label>
          <Input
            value={nombre}
            readOnly
            placeholder="Nombre"
            className="glass-input"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium">Curso</label>
          <Input
            value={curso}
            readOnly
            placeholder="Curso"
            className="glass-input"
          />
        </div>
      </div>

      {error && <p className="text-sm text-red-600 mb-3">{error}</p>}
      {mensaje && <p className="text-sm text-green-600 mb-3">{mensaje}</p>}

      {/* Tabla de tardanzas */}
      <div className="mt-4">
        <h3 className="mb-3 text-lg font-semibold">Tardanzas del estudiante</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="px-4 py-2 border bg-white/90">Matrícula</th>
                <th className="px-4 py-2 border bg-white/90">Nombre</th>
                <th className="px-4 py-2 border bg-white/90">Curso</th>
                <th className="px-4 py-2 border bg-white/90">Día</th>
                <th className="px-4 py-2 border bg-white/90">Justificación</th>
              </tr>
            </thead>
            <tbody>
              {filteredRows.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-6 text-center text-gray-600"
                  >
                    No hay tardanzas para esta matrícula.
                  </td>
                </tr>
              ) : (
                filteredRows.map((r) => (
                  <tr
                    key={r.id}
                    onClick={() => setSelectedRow(r)}
                    className={`cursor-pointer transition ${
                      selectedRow?.id === r.id
                        ? "bg-orange-100"
                        : "hover:bg-orange-50"
                    }`}
                  >
                    <td className="px-4 py-3 border">{r.matricula}</td>
                    <td className="px-4 py-3 border">{r.nombre}</td>
                    <td className="px-4 py-3 border">{r.curso}</td>
                    <td className="px-4 py-3 border">{r.dia}</td>
                    <td className="px-4 py-3 border">{r.justificacion}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ComboBox y botón para actualizar */}
      {selectedRow && (
        <div className="mt-6 space-y-4">
          <div>
            <label className="block mb-2 text-sm font-medium">
              Nueva justificación para {selectedRow.dia}:
            </label>
            <select
              value={nuevaJustificacion}
              onChange={(e) => setNuevaJustificacion(e.target.value)}
              className="bg-white border border-gray-300 rounded-lg px-3 py-2 w-full"
            >
              <option value="">Selecciona una justificación</option>
              <option value="Médica">Médica</option>
              <option value="Transporte">Transporte</option>
              <option value="Familiar">Familiar</option>
              <option value="Otro">Otro</option>
              <option value="Ninguna">Ninguna</option>
            </select>
          </div>

          {nuevaJustificacion && (
            <button
              onClick={handleActualizar}
              className="px-4 py-2 bg-[#d31039] text-white rounded-lg hover:bg-[#940a28] transition"
            >
              {textButton || "Actualizar tardanza"}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
