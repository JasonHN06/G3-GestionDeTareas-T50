export interface Task {
  id: string;
  nombre: string;
  descripcion: string;
  fechaLimite: Date;
  prioridad: string;
  estado: string;
  fechaUltimoCambio?: Date;
  vencida?: boolean;  // <- AGREGAR ESTO
}