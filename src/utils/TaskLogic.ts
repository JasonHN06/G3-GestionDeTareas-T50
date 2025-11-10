import type { Task } from "../types/task";

const prioridadPeso = {
  "Alta": 1,
  "Media": 2,
  "Baja": 3,
};

export function ordenarTareasPorFechaYPrioridad(tasks: Task[]): Task[] {
  return [...tasks].sort((a, b) => {
    const fechaA = a.fechaLimite.getTime();
    const fechaB = b.fechaLimite.getTime();
    if (fechaA !== fechaB) return fechaA - fechaB;
    return prioridadPeso[a.prioridad] - prioridadPeso[b.prioridad];
  });
}

export function marcarTareasVencidas(tasks: Task[]): (Task & { vencida: boolean })[] {
  const ahora = Date.now();
  return tasks.map((t) => ({
    ...t,
    vencida: t.estado === "Pendiente" && t.fechaLimite.getTime() < ahora,
  }));
}