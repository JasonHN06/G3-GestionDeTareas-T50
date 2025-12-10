import { useState } from "react";
import { useTasks } from "./hooks/useTask";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import { ordenarTareasPorFechaYPrioridad } from "./utils/TaskLogic";
import type { Task } from "./types/task";

function App() {
  const { tasks, addTask, editTask, deleteTask, toggleTaskStatus } = useTasks();
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [showForm, setShowForm] = useState(false);

  const sortedTasks = ordenarTareasPorFechaYPrioridad(tasks);

  const pendientes = tasks.filter(t => t.estado === "Pendiente").length;
  const completadas = tasks.filter(t => t.estado === "Completada").length;
  const vencidas = tasks.filter(t => {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    const fechaLimite = new Date(t.fechaLimite);
    fechaLimite.setHours(0, 0, 0, 0);
    return t.estado === "Pendiente" && fechaLimite < hoy;
  }).length;

  const completarTarea = (id: string) => {
    toggleTaskStatus(id);
  };

  const handleAddTask = (taskData: Omit<Task, "id" | "estado" | "fechaUltimoCambio">) => {
    addTask(taskData);
    setShowForm(false);
  };

  const handleEditTask = (taskData: Omit<Task, "id" | "estado" | "fechaUltimoCambio">) => {
    if (editingTask) {
      editTask(editingTask.id, taskData);
      setEditingTask(null);
    }
  };

  const startEditing = (task: Task) => {
    setEditingTask(task);
    setShowForm(false);
  };

  const cancelEditing = () => {
    setEditingTask(null);
  };

  const handleDeleteTask = (id: string) => {
    deleteTask(id);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Gestión de Tareas</h1>

      <div className="bg-white p-4 rounded-lg shadow-md mb-5 flex gap-6 flex-wrap">
        <div className="text-center">
          <p className="text-sm text-gray-600">Total</p>
          <p className="text-xl font-bold">{tasks.length}</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-600">Pendientes</p>
          <p className="text-xl font-bold text-blue-600">{pendientes}</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-600">Completadas</p>
          <p className="text-xl font-bold text-green-600">{completadas}</p>
        </div>
        {vencidas > 0 && (
          <div className="text-center">
            <p className="text-sm text-gray-600">Vencidas</p>
            <p className="text-xl font-bold text-red-600">{vencidas}</p>
          </div>
        )}
      </div>

      {!showForm && !editingTask && (
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded border-none cursor-pointer mt-2 mb-5"
        >
          + Nueva Tarea
        </button>
      )}

      {showForm && (
          <TaskForm
            mode="create"
            onSubmit={handleAddTask}
            onCancel={() => setShowForm(false)}
          />
      )}

      {editingTask && (
          <TaskForm
            mode="edit"
            onSubmit={handleEditTask}
            onCancel={cancelEditing}
            initialData={editingTask}
          />
      )}

      <TaskList
        tasks={sortedTasks}
        onComplete={completarTarea}
        onEdit={startEditing}
        onDelete={handleDeleteTask}
      />
    </div>
  );
}

export default App;