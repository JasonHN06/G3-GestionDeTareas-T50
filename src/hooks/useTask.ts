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
    const storedTasks = localStorage.getItem(TASKS_KEY);

    if (storedTasks) {
      const parsed = JSON.parse(storedTasks);

      const safeTasks = parsed.map((t: any) => {
        // Validación de fechaLímite
        const fechaLimiteObj = new Date(t.fechaLímite || t.fechaLimite);
        const fechaLimiteValida = isNaN(fechaLimiteObj.getTime())
          ? new Date() // fallback seguro
          : fechaLimiteObj;

        // Validación de fechaUltimoCambio
        const fechaCambioObj = new Date(t.fechaUltimoCambio);
        const fechaCambioValida = isNaN(fechaCambioObj.getTime())
          ? null
          : fechaCambioObj;

        return {
          ...t,
          fechaLimite: fechaLimiteValida,
          fechaUltimoCambio: fechaCambioValida,
        };
      });

      setTasks(safeTasks);
    }
  }, []);

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
