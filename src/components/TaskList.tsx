import React, { useState } from "react";
import type { Task } from "../types/task";
import ConfirmModal from "./ConfirmModal";

interface Props {
  tasks: Task[];
  onComplete: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

const TaskList: React.FC<Props> = ({ tasks, onComplete, onEdit, onDelete }) => {
  const hoy = Date.now();
  const [deleteModal, setDeleteModal] = useState<{ id: string; nombre: string } | null>(null);

  const handleDelete = (id: string, nombre: string) => {
    setDeleteModal({ id, nombre });
  };

  const confirmDelete = () => {
    if (deleteModal) {
      onDelete(deleteModal.id);
      setDeleteModal(null);
    }
  };

  return (
    <div style={{ marginTop: "20px", width: "100%", overflowX: "auto" }}>
      <ConfirmModal
        isOpen={deleteModal !== null}
        title="Confirmar Eliminación"
        message={`¿Está seguro de eliminar la tarea "${deleteModal?.nombre}"?`}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteModal(null)}
      />
      
      {tasks.length === 0 ? (
        <p>No hay tareas registradas.</p>
      ) : (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            backgroundColor: "#fff",
            borderRadius: "8px",
            overflow: "hidden",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          <thead style={{ backgroundColor: "#f3f4f6" }}>
            <tr>
              <th style={thStyle}>Nombre</th>
              <th style={thStyle}>Descripción</th>
              <th style={thStyle}>Fecha Límite</th>
              <th style={thStyle}>Prioridad</th>
              <th style={thStyle}>Estado</th>
              <th style={thStyle}>Último Cambio</th>
              <th style={thStyle}>Vencida</th>
              <th style={thStyle}>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {tasks.map((t) => {
              const fecha = new Date(t.fechaLimite).getTime();
              const vencida = t.estado === "Pendiente" && fecha < hoy;

              let rowColor = "#fff";
              if (t.estado === "Completada") rowColor = "#c6f6d5";
              if (vencida) rowColor = "#ffe0e0";

              return (
                <tr
                  key={t.id}
                  style={{
                    backgroundColor: rowColor,
                    borderBottom: "1px solid #e5e7eb",
                  }}
                >
                  <td style={tdStyle}>{t.nombre}</td>
                  <td style={tdStyle}>{t.descripcion}</td>
                  <td style={tdStyle}>
                    {new Date(t.fechaLimite).toLocaleDateString("es-HN")}
                  </td>
                  <td style={tdStyle}>{t.prioridad}</td>

                  <td style={{ ...tdStyle, fontWeight: 600 }}>
                    {t.estado === "Pendiente" ? "Pendiente" : "Completada"}
                  </td>

                  <td style={tdStyle}>
                    {t.fechaUltimoCambio
                      ? new Date(t.fechaUltimoCambio).toLocaleString("es-HN")
                      : "-"}
                  </td>

                  <td style={tdStyle}>
                    {vencida ? (
                      <span style={{ color: "red", fontSize: "20px" }}>⚠️</span>
                    ) : t.estado === "Completada" ? (
                      <span style={{ color: "green", fontSize: "20px" }}>✔️</span>
                    ) : (
                      ""
                    )}
                  </td>

                  <td style={tdStyle}>
                    {t.estado === "Pendiente" && (
                      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                        <button
                          onClick={() => onComplete(t.id)}
                          style={{
                            backgroundColor: "#10b981",
                            color: "#fff",
                            border: "none",
                            padding: "6px 12px",
                            borderRadius: "4px",
                            cursor: "pointer",
                            fontSize: "13px",
                          }}
                          title="Completar tarea"
                        >
                          Completar
                        </button>
                        <button
                          onClick={() => onEdit(t)}
                          style={{
                            backgroundColor: "#f59e0b",
                            color: "#fff",
                            border: "none",
                            padding: "6px 12px",
                            borderRadius: "4px",
                            cursor: "pointer",
                            fontSize: "13px",
                          }}
                          title="Editar tarea"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleDelete(t.id, t.nombre)}
                          style={{
                            backgroundColor: "#ef4444",
                            color: "#fff",
                            border: "none",
                            padding: "6px 12px",
                            borderRadius: "4px",
                            cursor: "pointer",
                            fontSize: "13px",
                          }}
                          title="Eliminar tarea"
                        >
                          Eliminar
                        </button>
                      </div>
                    )}
                    {t.estado === "Completada" && (
                      <button
                        onClick={() => handleDelete(t.id, t.nombre)}
                        style={{
                          backgroundColor: "#ef4444",
                          color: "#fff",
                          border: "none",
                          padding: "6px 12px",
                          borderRadius: "4px",
                          cursor: "pointer",
                          fontSize: "13px",
                        }}
                        title="Eliminar tarea"
                      >
                        Eliminar
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

const thStyle: React.CSSProperties = {
  padding: "12px",
  textAlign: "left",
  fontWeight: 600,
  fontSize: "14px",
  borderBottom: "2px solid #e5e7eb",
};

const tdStyle: React.CSSProperties = {
  padding: "12px",
  fontSize: "14px",
  verticalAlign: "middle",
};

export default TaskList;