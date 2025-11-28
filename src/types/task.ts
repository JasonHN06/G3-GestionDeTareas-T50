export interface Task {
  id: string;
  nombre: string;
  descripcion: string;
  fechaLimite: Date;
  prioridad: "Alta" | "Media" | "Baja";
  estado: string;
  fechaUltimoCambio?: Date | null;
  vencida?: boolean;
}