"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input"; // shadcn input

export default function EliminarTardanza({ textButton = "Eliminar tardanza" }) {
  // Mapeo ejemplo
  const students = {
    "2024-0112": { name: "Juan Gabriel", curso: "5toF" },
    "2025-0112": { name: "Ana María", curso: "5toE" },
    "2023-0112": { name: "Luis Pérez", curso: "3roA" },
  };

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
    },
  ]);
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
        setError("");
      }
    } else {
      setNombre("");
      setCurso("");
      if (matricula.length > 0) setError("Formato: AAAA-XXXX");
      else setError("");
    }
  }, [matricula]);

  // Eliminar fila de la tabla
  function handleDelete(id) {
    setRows((prev) => prev.filter((r) => r.id !== id));
    setMensaje("✅ Tardanza eliminada correctamente.");
    // Ocultar mensaje después de unos segundos
    setTimeout(() => setMensaje(""), 3000);
  }

  return (
    <div className="w-240 mx-auto p-6 rounded-2xl bg-[#ffffff]/50 border border-gray-400/30 backdrop-blur-2xl text-gray-900">
      {/* Inputs superiores */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block mb-2 text-sm font-medium">Matrícula</label>
          <Input
            value={matricula}
            onChange={(e) => setMatricula(e.target.value)}
            placeholder="2023-0140"
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

      {/* Tabla */}
      <div className="mt-4">
        <h3 className="mb-3 text-lg font-semibold">
          Estadísticas del estudiante
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="px-4 py-2 border rounded-tl-lg bg-white/90">
                  Matrícula
                </th>
                <th className="px-4 py-2 border bg-white/90">Nombre</th>
                <th className="px-4 py-2 border bg-white/90">Curso</th>
                <th className="px-4 py-2 border bg-white/90">Día</th>
                <th className="px-4 py-2 border rounded-tr-lg bg-white/90 text-center">
                  Acción
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-6 text-center text-gray-600"
                  >
                    No hay registros actualmente.
                  </td>
                </tr>
              ) : (
                rows.map((r) => (
                  <tr
                    key={r.id}
                    className="odd:bg-white even:bg-white/95 transition hover:bg-red-50"
                  >
                    <td className="px-4 py-3 border">{r.matricula}</td>
                    <td className="px-4 py-3 border">{r.nombre}</td>
                    <td className="px-4 py-3 border">{r.curso}</td>
                    <td className="px-4 py-3 border">{r.dia}</td>
                    <td className="px-4 py-3 border text-center">
                      <button
                        onClick={() => handleDelete(r.id)}
                        className="p-2 rounded-lg hover:bg-red-100 text-red-600"
                        title="Eliminar"
                      >
                        {/* SVG de basurero */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.8}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 7h12m-9 0v10m6-10v10M4 7h16l-1.5 12.5A2 2 0 0 1 16.5 22h-9a2 2 0 0 1-1.99-1.5L4 7zm3-3h10v2H7V4z"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
