import { useTasks } from "./hooks/useTask";

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

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Gestión de Tareas</h1>
      <button onClick={handleAddTestTask} className="bg-blue-500 text-white p-2 mt-4">
        Agregar Tarea de Prueba
      </button>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.nombre} - {task.estado} - Prioridad: {task.prioridad}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App
