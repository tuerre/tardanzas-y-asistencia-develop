"use client";

import React from "react";

export default function CursosPublicados() {
  const data = [
    { maestro: "Juan Pérez", publicada: "Sí" },
    { maestro: "Ana Rodríguez", publicada: "Sí" },
    { maestro: "Carlos Gómez", publicada: "Sí" },
    { maestro: "María López", publicada: "No" },
    { maestro: "Pedro Hernández", publicada: "No" },
    { maestro: "Lucía Fernández", publicada: "No" },
    { maestro: "José Martínez", publicada: "Incapaz de obtener" },
  ];

  return (
    <div className="w-240 mx-auto p-6 rounded-2xl bg-[#ffffff]/50 border border-gray-400/30 backdrop-blur-2xl text-gray-900">
      <h3 className="mb-4 text-lg font-semibold text-center">
        Estado de publicación de la asistencia por maestro
      </h3>

      <div className="overflow-hidden rounded-xl border border-gray-700/60 shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white/80">
              <th className="px-4 py-2 border-b">Maestro</th>
              <th className="px-4 py-2 border-b">Publicada</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr
                key={i}
                className="odd:bg-white/80 even:bg-white/60 transition hover:bg-white/90"
              >
                <td className="px-4 py-3 border-b font-medium">{row.maestro}</td>
                <td
                  className={`px-4 py-3 border-b font-semibold ${
                    row.publicada === "Sí"
                      ? "text-green-700"
                      : row.publicada === "No"
                      ? "text-red-600"
                      : "text-yellow-600"
                  }`}
                >
                  {row.publicada}
                </td>
                <td className="px-4 py-3 border-b">{row.curso}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
