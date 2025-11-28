import type { Task } from "../types/task";

interface Props {
  tasks: Task[];
}

export default function TaskList({ tasks }: Props) {
  return (
    <div className="mt-10">
      <div className="bg-white shadow-xl rounded-lg border border-gray-200 overflow-hidden">
        
        {/* Encabezado */}
        <div className="px-6 py-4 border-b bg-gray-50">
          <h2 className="text-xl font-semibold text-gray-800">
            Lista de Tareas
          </h2>
        </div>

        {/* Tabla */}
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-gray-700">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-3 text-left font-semibold">Nombre</th>
                <th className="p-3 text-left font-semibold">Descripción</th>
                <th className="p-3 text-left font-semibold">Fecha Límite</th>
                <th className="p-3 text-left font-semibold">Prioridad</th>
                <th className="p-3 text-left font-semibold">Estado</th>
                <th className="p-3 text-left font-semibold">Último Cambio</th>
                <th className="p-3 text-center font-semibold">Vencida</th>
              </tr>
            </thead>

            <tbody>
              {tasks.map((task, index) => {
                const isVencida = task.vencida && task.estado === "Pendiente";

                return (
                  <tr
                    key={task.id}
                    className={`border-t transition ${
                      isVencida
                        ? "bg-red-100"
                        : index % 2 === 0
                        ? "bg-white"
                        : "bg-gray-50"
                    } hover:bg-gray-100`}
                  >
                    <td className="p-3">{task.nombre}</td>
                    <td className="p-3">{task.descripcion}</td>
                    <td className="p-3">
                      {new Date(task.fechaLimite).toLocaleDateString()}
                    </td>

                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded text-white text-xs font-bold ${
                          task.prioridad === "Alta"
                            ? "bg-red-500"
                            : task.prioridad === "Media"
                            ? "bg-yellow-500"
                            : "bg-green-600"
                        }`}
                      >
                        {task.prioridad}
                      </span>
                    </td>

                    <td className="p-3 font-medium">
                      {task.estado === "Pendiente" ? (
                        <span className="text-yellow-700 px-2 py-1 rounded text-xs font-bold">
                          Pendiente
                        </span>
                      ) : (
                        <span className="text-green-700 px-2 py-1 rounded text-xs font-bold">
                          Completada
                        </span>
                      )}
                    </td>

                    <td className="p-3">
                      {task.fechaUltimoCambio
                        ? new Date(task.fechaUltimoCambio).toLocaleString()
                        : "-"}
                    </td>

                    <td className="p-3 text-center font-bold text-lg">
                      {isVencida ? "⚠️" : "✔️"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}