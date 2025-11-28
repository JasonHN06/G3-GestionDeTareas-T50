import { useState, useEffect } from "react";
import type { Task } from "../types/task";

const TASKS_KEY = "tasks";
export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  useEffect(() => {
    const storedTasks = localStorage.getItem(TASKS_KEY);
    if (storedTasks) {
      const parsedTasks = JSON.parse(storedTasks);
      const tasksWithDates: Task[] = parsedTasks.map((task: any) => ({
        ...task,
        fechaLimite: new Date(task.fechaLimite),
        fechaUltimoCambio: task.fechaUltimoCambio
          ? new Date(task.fechaUltimoCambio)
          : null,
      }));
      setTasks(tasksWithDates);
    }
  }, []);

  useEffect(() => {
    if (tasks.length > 0) {
      const tasksToStore = tasks.map((task) => ({
        ...task,
        fechaLimite: task.fechaLimite.toISOString(),
        fechaUltimoCambio: task.fechaUltimoCambio
          ? task.fechaUltimoCambio.toISOString()
          : null,
      }));
      localStorage.setItem(TASKS_KEY, JSON.stringify(tasksToStore));
    }
  }, [tasks]);

  const addTask = (
    newTask: Omit<Task, "id" | "estado" | "fechaUltimoCambio">
  ) => {
    const id = crypto.randomUUID();
    const task: Task = {
      ...newTask,
      id,
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
