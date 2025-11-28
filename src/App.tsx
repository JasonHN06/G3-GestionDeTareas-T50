import { useTasks } from "./hooks/useTask";
import TaskList from "./components/TaskList";

function App() {
  const { tasks, setTasks, addTask } = useTasks();

  // completar una tarea
  const completarTarea = (id: string) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, estado: "Completada", fechaUltimoCambio: new Date() }
          : t
      )
    );
  };

const handleAddTestTask = () => {
  addTask({
    nombre: "Tarea de Prueba",
    descripcion: "Descripción de prueba",
    fechaLimite: new Date("2025-11-15"),
    prioridad: "Alta",
  });
};

  return (
    <div style={{ padding: "25px" }}>
      <h1>Gestión de Tareas</h1>

      <button
        style={{
          backgroundColor: "#007bff",
          color: "white",
          padding: "10px 14px",
          borderRadius: "5px",
          border: "none",
          cursor: "pointer",
          marginTop: "10px",
        }}
        onClick={handleAddTestTask}
      >
        Agregar Tarea de Prueba
      </button>

      <TaskList tasks={tasks} onComplete={completarTarea} />
    </div>
  );
}

export default App;