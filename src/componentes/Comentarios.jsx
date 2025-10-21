// src/componentes/Comentarios.jsx
import React from "react";

export function Comentarios() {
  const comments = [
    { id: 1, name: "María", text: "Excelente selección y envío rápido." },
    { id: 2, name: "Jorge", text: "Me gustó el servicio de atención." },
  ];

  return (
    <div className="space-y-4">
      {comments.map(c => (
        <div key={c.id} className="bg-white p-4 rounded shadow">
          <div className="font-semibold">{c.name}</div>
          <div className="text-sm text-gray-700">{c.text}</div>
        </div>
      ))}
    </div>
  );
}
