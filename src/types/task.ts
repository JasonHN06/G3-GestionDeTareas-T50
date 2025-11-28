export interface Task {
    id: string;
    nombre: string;
    descripcion: string;
    fechaLimite: Date;
    estado: 'Pendiente' | 'Completada';
    prioridad: 'Alta' | 'Media' | 'Baja';
    fechaUltimoCambio: Date | null;
}