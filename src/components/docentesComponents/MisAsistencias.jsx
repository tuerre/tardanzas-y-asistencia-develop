import { useState } from "react";

export default function MisAsistencias() {
  const cursos = ["4toA", "4toB", "4toC", "4toD", "4toE", "4toF", "4toG", "5toA", "5toB", "5toC", "5toD", "5toE", "5toF", "5toG", "6toA", "6toB", "6toC", "6toD", "6toE", "6toF", "6toG"];
  const [curso, setCurso] = useState("");
  const [fecha, setFecha] = useState("");
  const [asistencias, setAsistencias] = useState([]);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [estudianteSeleccionado, setEstudianteSeleccionado] = useState(null);

  const datosFake = [
    { nombre: "Jendry Abreu", numero: 16, estado: "Presente" },
    { nombre: "Carlos Jiménez", numero: 8, estado: "Ausente" },
    { nombre: "Luis Martínez", numero: 4, estado: "Tardanza" },
    { nombre: "Rafael Gómez", numero: 1, estado: "Presente" },
    { nombre: "Pedro Cruz", numero: 10, estado: "Presente" },
  ];

  function filtrar() {
    if (!curso) {
      alert("Selecciona un curso para filtrar");
      return;
    }
    // simulación de datos filtrados
    setAsistencias(datosFake);
  }

  function limpiarFiltro() {
    setFecha("");
    setAsistencias([]);
  }

  function abrirModal(est) {
    setEstudianteSeleccionado(est);
    setModalAbierto(true);
  }

  function cerrarModal() {
    setModalAbierto(false);
    setEstudianteSeleccionado(null);
  }

  function cambiarEstado(nuevoEstado) {
    setAsistencias((prev) =>
      prev.map((est) =>
        est.nombre === estudianteSeleccionado.nombre
          ? { ...est, estado: nuevoEstado }
          : est
      )
    );
    cerrarModal();
  }

  return (
    <div className="text-white">
      <div className="flex gap-4 mb-6">
        <select value={curso} onChange={(e) => setCurso(e.target.value)} className="glass-input">
          <option value="">Seleccionar curso</option>
          {cursos.map((c) => <option key={c}>{c}</option>)}
        </select>
        <input
          type="date"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          className="glass-input px-4"
        />
        <button onClick={filtrar} className="px-8 bg-[#d31039] text-white py-3 rounded-lg text-lg font-medium hover:brightness-90 transition">
          Filtrar
        </button>
        <button onClick={limpiarFiltro} className="px-8 bg-[#222] text-white py-3 rounded-lg text-lg font-medium hover:brightness-90 transition">
          Limpiar
        </button>
      </div>

      {asistencias.length > 0 && (
        <div className="w-6xl mx-auto p-6 rounded-2xl bg-[#ffffff]/50 border border-gray-400/30 backdrop-blur-2xl text-gray-900">
          <table className="w-full text-center border rounded-3xl overflow-hidden">
            <thead>
              <tr className="border-b">
                <th>Nombre Completo</th>
                <th>Número</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {asistencias.map((est, i) => (
                <tr
                  key={i}
                  className="border-t cursor-pointer hover:bg-gray-200/60 transition"
                  onClick={() => abrirModal(est)}
                >
                  <td>{est.nombre}</td>
                  <td>{est.numero}</td>
                  <td>{est.estado}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* MODAL */}
      {modalAbierto && estudianteSeleccionado && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white text-gray-900 p-6 rounded-2xl shadow-2xl w-[350px] text-center">
            <h2 className="text-xl font-semibold mb-3">
              Cambiar estado de <br />
              <span className="text-[#d31039]">{estudianteSeleccionado.nombre}</span>
            </h2>
            <div className="flex flex-col gap-3 mb-4">
              {["Presente", "Ausente", "Tardanza"].map((estado) => (
                <button
                  key={estado}
                  onClick={() => cambiarEstado(estado)}
                  className={`py-2 rounded-lg font-semibold transition ${
                    estado === "Presente"
                      ? "bg-green-600 text-white hover:brightness-90"
                      : estado === "Ausente"
                      ? "bg-red-600 text-white hover:brightness-90"
                      : "bg-yellow-500 text-white hover:brightness-90"
                  }`}
                >
                  {estado}
                </button>
              ))}
            </div>
            <button
              onClick={cerrarModal}
              className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:brightness-90"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
