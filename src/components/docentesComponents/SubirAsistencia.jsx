import { useState } from "react";

export default function Asistencia() {
  const cursos = ["4toA", "4toB", "4toC", "4toD", "4toE", "4toF", "4toG", "5toA", "5toB", "5toC", "5toD", "5toE", "5toF", "5toG", "6toA", "6toB", "6toC", "6toD", "6toE", "6toF", "6toG"];
  const horas = ["Primera", "Segunda", "Tercera", "Cuarta", "Quinta", "Sexta", "Séptima", "Octava"];

  const [curso, setCurso] = useState("");
  const [hora, setHora] = useState("");
  const [estudiantes, setEstudiantes] = useState([]);
  const [asistenciasSubidas, setAsistenciasSubidas] = useState({});

  function generarEstudiantes() {
    const nombres = [
      "Jendry Abreu", "Carlos Jiménez", "Luis Martínez", "Rafael Gómez",
      "Pedro Cruz", "José Rosario", "Kevin García", "Anthony Mateo",
      "Samuel López", "Ángel Pérez", "Cristian Lara", "Jonathan Díaz",
      "David Torres", "Miguel Paredes", "Ismael Castillo"
    ];
    return nombres.map((nombre, i) => ({
      nombre,
      numero: i + 1,
      presente: false,
      ausente: false,
      tardanza: false
    }));
  }

  function handleSeleccion() {
    if (!curso || !hora) return alert("Selecciona curso y hora primero");
    if (asistenciasSubidas[curso]?.includes(hora)) {
      alert("La asistencia de esta hora en este curso ya se subió...");
      return;
    }
    setEstudiantes(generarEstudiantes());
  }

  function handleCheck(index, campo) {
    setEstudiantes((prev) => {
      const copia = [...prev];
      copia[index][campo] = !copia[index][campo];
      if (campo !== "presente") copia[index].presente = false;
      if (campo !== "ausente") copia[index].ausente = false;
      if (campo !== "tardanza") copia[index].tardanza = false;
      return copia;
    });
  }

  function publicarAsistencia() {
    if (!curso || !hora) return;
    setAsistenciasSubidas((prev) => ({
      ...prev,
      [curso]: [...(prev[curso] || []), hora],
    }));
    alert("Asistencia subida correctamente");
    setEstudiantes([]);
    setCurso("");
    setHora("");
  }

  return (
    <div className="text-white">
      <div className="flex gap-4 mb-6">
        <select value={curso} onChange={(e) => setCurso(e.target.value)} className="glass-input">
          <option value="">Seleccionar curso</option>
          {cursos.map((c) => <option key={c}>{c}</option>)}
        </select>
        <select value={hora} onChange={(e) => setHora(e.target.value)} className="glass-input">
          <option value="">Seleccionar hora</option>
          {horas.map((h) => <option key={h}>{h}</option>)}
        </select>
        <button onClick={handleSeleccion} className="px-8 bg-[#d31039] text-white py-3 rounded-lg text-lg font-medium hover:brightness-90 transition">Continuar</button>
      </div>

      {estudiantes.length > 0 && (
        <div className="w-6xl mx-auto p-6 rounded-2xl bg-[#ffffff]/50 border border-gray-400/30 backdrop-blur-2xl text-gray-900">
          <table className="w-full text-center border rounded-3xl overflow-hidden">
            <thead>
              <tr className="border-b">
                <th>Nombre Completo</th>
                <th>Número</th>
                <th>Presente</th>
                <th>Ausente</th>
                <th>Tardanza</th>
              </tr>
            </thead>
            <tbody>
              {estudiantes.map((est, i) => (
                <tr key={i} className="border-t">
                  <td>{est.nombre}</td>
                  <td>{est.numero}</td>
                  {["presente", "ausente", "tardanza"].map((campo) => (
                    <td key={campo}>
                      <input
                        type="checkbox"
                        checked={est[campo]}
                        onChange={() => handleCheck(i, campo)}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          <button
            onClick={publicarAsistencia}
            className="mt-6 bg-[#d31039] py-2 px-6 rounded-lg text-white font-semibold hover:brightness-90"
          >
            Publicar asistencia
          </button>
        </div>
      )}
    </div>
  );
}
