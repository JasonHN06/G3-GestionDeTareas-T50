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

  return { tasks, setTasks, addTask, completeTask };
};