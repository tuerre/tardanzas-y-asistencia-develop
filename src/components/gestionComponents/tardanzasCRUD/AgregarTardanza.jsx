"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input"; // shadcn input (ya lo tienes)
 
export default function AttendanceForm( { textButton = "Agregar Tardanza", textTableTitle = "Tardanzas" } ) {
  // mapeo de ejemplo de matrículas -> datos del estudiante
  const students = {
    "2024-0112": { name: "Juan José", curso: "4toB" },
    "2025-0112": { name: "Ana María", curso: "5toE" },
    "2023-0112": { name: "Luis Pérez", curso: "3roA" },
    "2022-0112": { name: "María López", curso: "2doC" },
  };

  const [matricula, setMatricula] = useState("");
  const [nombre, setNombre] = useState("");
  const [curso, setCurso] = useState("");
  const [justificacion, setJustificacion] = useState("Ninguna");
  const [rows, setRows] = useState([]);
  const [error, setError] = useState("");

  // Al cambiar matrícula, intentar autocompletar
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

  // Añadir tardanza a la "tabla"
  function handleAdd() {
    // validaciones
    if (!matricula || !/^\d{4}-\d{4}$/.test(matricula)) {
      setError("Introduce una matrícula válida (ej. 2024-0112).");
      return;
    }
    if (!nombre || nombre === "No encontrado") {
      setError("No se encontró el estudiante para esa matrícula.");
      return;
    }

    const now = new Date();
    const dia = now.toLocaleDateString("es-ES"); // 23/7/2025
    const nueva = {
      id: rows.length + 1,
      tardanza: String(rows.length + 1).padStart(2, "0"),
      dia,
      justificacion,
    };

    setRows((r) => [nueva, ...r]); // mostrar la nueva arriba
    // opcional: limpiar matricula pero mantener nombre/curso si quieres
    setMatricula("");
    setNombre("");
    setCurso("");
    setJustificacion("Ninguna");
    setError("");
  }

  return (
  <div className="w-240 mx-auto p-6 rounded-2xl bg-[#ffffff]/50 border border-gray-400/30 backdrop-blur-2xl text-gray-900">
    {/* Inputs superior */}
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
        <Input value={nombre} readOnly placeholder="Nombre" className="glass-input" />
      </div>

      <div>
        <label className="block mb-2 text-sm font-medium">Curso</label>
        <Input value={curso} readOnly placeholder="Curso" className="glass-input" />
      </div>
    </div>

    {/* Justificación y tabla lateral */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
      {/* Combo y botón */}
      <div className="space-y-4">
        <label className="block mb-2 text-sm font-medium">Justificación</label>
        <select
          value={justificacion}
          onChange={(e) => setJustificacion(e.target.value)}
          className="glass-input w-full rounded-lg px-4 py-3 border border-white/80 text-gray-800"
        >
          <option value="Ninguna">Ninguna</option>
          <option value="Falta médica">Falta médica</option>
          <option value="Transporte">Transporte</option>
          <option value="Otro">Otro</option>
        </select>

        <div>
          <button
            onClick={handleAdd}
            className="mt-4 w-full bg-[#d31039] text-white py-3 rounded-lg text-lg font-medium hover:brightness-90 transition"
          >
            {textButton}
          </button>
          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        </div>
      </div>

      {/* Tabla */}
      <div className="md:col-span-2">
        <h3 className="mb-3 text-lg font-semibold">Estadísticas del estudiante</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="px-4 py-2 border rounded-tl-lg bg-white/90">{textTableTitle}</th>
                <th className="px-4 py-2 border bg-white/90">Día</th>
                <th className="px-4 py-2 border rounded-tr-lg bg-white/90">Justificación</th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-4 py-6 text-center text-gray-600">
                    No hay registros todavía.
                  </td>
                </tr>
              ) : (
                rows.map((r) => (
                  <tr key={r.id} className="odd:bg-white even:bg-white/95">
                    <td className="px-4 py-3 border">{r.tardanza}</td>
                    <td className="px-4 py-3 border">{r.dia}</td>
                    <td className="px-4 py-3 border">{r.justificacion}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
);

}
