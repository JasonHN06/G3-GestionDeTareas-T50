import { useTasks } from "./hooks/useTask";
import { ordenarTareasPorFechaYPrioridad, marcarTareasVencidas } from "./utils/taskLogic";

function App() {
  const { tasks, addTask } = useTasks();

  const handleAddTestTask = () => {
    addTask({
      nombre: 'Tarea de Prueba',
      descripcion: 'Descripción de prueba',
      fechaLimite: new Date('2025-11-15'),
      prioridad: 'Alta',
    });
  };

  const tareasOrdenadas = ordenarTareasPorFechaYPrioridad(tasks);
  const tareasParaMostrar = marcarTareasVencidas(tareasOrdenadas);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Gestión de Tareas</h1>
      <button onClick={handleAddTestTask} className="bg-blue-500 text-white p-2 mt-4">
        Agregar Tarea de Prueba
      </button>
      <ul>
        {tareasParaMostrar.map((task) => (
          <li key={task.id} className={task.vencida ? "bg-red-200" : ""}>
            {task.nombre} - {task.estado} - Prioridad: {task.prioridad}
            {task.vencida && task.estado === "Pendiente" && (
              <span className="text-red-700 font-bold ml-2">Pendiente Vencida</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
