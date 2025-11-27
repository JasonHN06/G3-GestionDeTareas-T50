import { useTasks } from "./hooks/useTask";
import { ordenarTareasPorFechaYPrioridad, marcarTareasVencidas } from "./utils/TaskLogic";
import TaskList from "./components/TaskList";

function App() {
  const { tasks, addTask } = useTasks();

  const handleAddTestTask = () => {
    addTask({
      nombre: "Tarea de Prueba",
      descripcion: "Descripción de prueba",
      fechaLimite: new Date("2025-12-01"),
      prioridad: "Alta",
    });
  };

  const tareasOrdenadas = ordenarTareasPorFechaYPrioridad(tasks);
  const tareasParaMostrar = marcarTareasVencidas(tareasOrdenadas);

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Gestión de Tareas</h1>

      <button
        onClick={handleAddTestTask}
        className="bg-blue-500 text-white p-2 mt-4 rounded"
      >
        Agregar Tarea de Prueba
      </button>

      {/* TU TABLA PROFESIONAL */}
      <TaskList tasks={tareasParaMostrar} />
    </div>
  );
}

export default App;
