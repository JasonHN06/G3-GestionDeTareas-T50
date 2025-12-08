import React, { useState, useEffect } from "react";
import type { Task } from "../types/task";

interface Props {
  onSubmit: (task: Omit<Task, "id" | "estado" | "fechaUltimoCambio">) => void;
  onCancel?: () => void;
  initialData?: Task;
  mode: "create" | "edit";
}

const TaskForm: React.FC<Props> = ({ onSubmit, onCancel, initialData, mode }) => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fechaLimite, setFechaLimite] = useState("");
  const [prioridad, setPrioridad] = useState<"Alta" | "Media" | "Baja">("Media");
  const [errors, setErrors] = useState<{
    nombre?: string;
    descripcion?: string;
    fechaLimite?: string;
  }>({});
  const [showExpiredWarning, setShowExpiredWarning] = useState(false);

  useEffect(() => {
    if (initialData && mode === "edit") {
      setNombre(initialData.nombre);
      setDescripcion(initialData.descripcion);
      const fecha = new Date(initialData.fechaLimite);
      const year = fecha.getFullYear();
      const month = String(fecha.getMonth() + 1).padStart(2, "0");
      const day = String(fecha.getDate()).padStart(2, "0");
      setFechaLimite(`${year}-${month}-${day}`);
      setPrioridad(initialData.prioridad);
    }
  }, [initialData, mode]);

  const validateForm = (): boolean => {
    const newErrors: typeof errors = {};

    if (!nombre.trim()) {
      newErrors.nombre = "El nombre es obligatorio";
    }

    if (!descripcion.trim()) {
      newErrors.descripcion = "La descripción es obligatoria";
    }

    if (!fechaLimite) {
      newErrors.fechaLimite = "La fecha límite es obligatoria";
    } else {
      const selectedDate = new Date(fechaLimite);
      if (isNaN(selectedDate.getTime())) {
        newErrors.fechaLimite = "Fecha inválida";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    onSubmit({
      nombre: nombre.trim(),
      descripcion: descripcion.trim(),
      fechaLimite: new Date(fechaLimite),
      prioridad,
    });

    if (mode === "create") {
      setNombre("");
      setDescripcion("");
      setFechaLimite("");
      setPrioridad("Media");
      setErrors({});
      setShowExpiredWarning(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-5 rounded-lg shadow-md mb-5"
    >
      <h2 className="text-xl font-bold mb-4">
        {mode === "create" ? "Agregar Nueva Tarea" : "Editar Tarea"}
      </h2>

      <div className="mb-4">
        <label htmlFor="nombre" className="block font-medium mb-2">
          Nombre <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className={`w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.nombre ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Ingrese el nombre de la tarea"
        />
        {errors.nombre && (
          <p className="text-red-500 text-xs mt-1">{errors.nombre}</p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="descripcion" className="block font-medium mb-2">
          Descripción <span className="text-red-500">*</span>
        </label>
        <textarea
          id="descripcion"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          rows={3}
          className={`w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.descripcion ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Ingrese la descripción de la tarea"
        />
        {errors.descripcion && (
          <p className="text-red-500 text-xs mt-1">{errors.descripcion}</p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="fechaLimite" className="block font-medium mb-2">
          Fecha Límite <span className="text-red-500">*</span>
        </label>
        <input
          type="date"
          id="fechaLimite"
          value={fechaLimite}
          onChange={(e) => {
            const selectedDate = new Date(e.target.value);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            selectedDate.setHours(0, 0, 0, 0);
            
            setFechaLimite(e.target.value);
            setShowExpiredWarning(selectedDate < today && mode === "create");
          }}
          className={`w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.fechaLimite ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.fechaLimite && (
          <p className="text-red-500 text-xs mt-1">{errors.fechaLimite}</p>
        )}
        {showExpiredWarning && !errors.fechaLimite && (
          <p className="text-orange-600 text-xs mt-1 flex items-center gap-1">
            <span>⚠️</span>
            <span>Esta fecha ya está vencida. La tarea se marcará como vencida.</span>
          </p>
        )}
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-2">
          Prioridad <span className="text-red-500">*</span>
        </label>
        <div className="flex gap-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="prioridad"
              value="Alta"
              checked={prioridad === "Alta"}
              onChange={(e) => setPrioridad(e.target.value as "Alta" | "Media" | "Baja")}
              className="mr-2"
            />
            Alta
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="prioridad"
              value="Media"
              checked={prioridad === "Media"}
              onChange={(e) => setPrioridad(e.target.value as "Alta" | "Media" | "Baja")}
              className="mr-2"
            />
            Media
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="prioridad"
              value="Baja"
              checked={prioridad === "Baja"}
              onChange={(e) => setPrioridad(e.target.value as "Alta" | "Media" | "Baja")}
              className="mr-2"
            />
            Baja
          </label>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded border-none cursor-pointer font-medium"
        >
          {mode === "create" ? "Agregar Tarea" : "Guardar Cambios"}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded border-none cursor-pointer font-medium"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
};

export default TaskForm;
