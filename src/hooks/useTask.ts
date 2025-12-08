import { useState, useEffect } from "react";
import type { Task } from "../types/task";

const TASKS_KEY = "tasks";
export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  useEffect(() => {
    const stored = localStorage.getItem(TASKS_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        const tasksWithDates: Task[] = parsed.map((task: any) => ({
          ...task,
          fechaLimite: new Date(task.fechaLimite),
          fechaUltimoCambio: task.fechaUltimoCambio ? new Date(task.fechaUltimoCambio) : null,
        }));
        setTasks(tasksWithDates);
      } catch (e) {
        console.error("Error al leer tareas del localStorage", e);
      }
    }
  }, []);

  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
    } else {
      localStorage.removeItem(TASKS_KEY);
    }
  }, [tasks]);

  const addTask = (
    newTask: Omit<Task, "id" | "estado" | "fechaUltimoCambio">
  ) => {
    const task: Task = {
      ...newTask,
      id: crypto.randomUUID(),
      estado: "Pendiente",
      fechaUltimoCambio: null,
    };
    setTasks((prev) => [...prev, task]);
  };

  const completeTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id && t.estado === "Pendiente"
          ? { ...t, estado: "Completada", fechaUltimoCambio: new Date() }
          : t
      )
    );
  };

  const editTask = (
    id: string,
    updatedData: Omit<Task, "id" | "estado" | "fechaUltimoCambio">
  ) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              nombre: updatedData.nombre,
              descripcion: updatedData.descripcion,
              fechaLimite: updatedData.fechaLimite,
              prioridad: updatedData.prioridad,
            }
          : t
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleTaskStatus = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          // Si cambia de Pendiente a Completada, actualizar fecha
          if (t.estado === "Pendiente") {
            return { ...t, estado: "Completada", fechaUltimoCambio: new Date() };
          }
          // Si cambia de Completada a Pendiente, mantener la fecha
          return { ...t, estado: "Pendiente" };
        }
        return t;
      })
    );
  };

  return { tasks, setTasks, addTask, completeTask, editTask, deleteTask, toggleTaskStatus };
};