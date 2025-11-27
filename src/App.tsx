import { useTasks } from "./hooks/useTask";
import { ordenarTareasPorFechaYPrioridad, marcarTareasVencidas } from "./utils/TaskLogic";
import TaskList from "./components/TaskList";

function App() {
  const { tasks, addTask } = useTasks();

  const handleAddTestTask = () => {
    addTask({
      nombre: "Tarea de Prueba",
      descripcion: "Descripción de prueba",
      fechaLimite: new Date("2025-11-15"),
      prioridad: "Alta",
    });
  };

  const tareasOrdenadas = ordenarTareasPorFechaYPrioridad(tasks);
  const tareasParaMostrar = marcarTareasVencidas(tareasOrdenadas);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Gestión de Tareas</h1>

      <button
        onClick={handleAddTestTask}
        className="bg-blue-500 text-white p-2 mt-4 rounded"
      >
        Agregar Tarea de Prueba
      </button>

      {/* AQUÍ VA TU COMPONENTE PROFESIONAL */}
      <TaskList tasks={tareasParaMostrar} />
    </div>
  );
}

export default App;
