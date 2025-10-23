// src/pages/Novedades.jsx
import React, { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";

export default function Novedades() {
  const [titulo, setTitulo] = useState("");
  const [comentario, setComentario] = useState("");
  const [comentarios, setComentarios] = useState([]);
  const [preview, setPreview] = useState(false);

  // 🔹 Escuchar comentarios en tiempo real
  useEffect(() => {
    const q = query(collection(db, "comentarios"), orderBy("fecha", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setComentarios(data);
    });

    return () => unsubscribe();
  }, []);

  // 🔹 Publicar nuevo comentario
  const handlePublicar = async (e) => {
    e.preventDefault();
    if (!titulo.trim() || !comentario.trim()) return;

    try {
      await addDoc(collection(db, "comentarios"), {
        titulo,
        comentario,
        fecha: serverTimestamp(),
      });
      setTitulo("");
      setComentario("");
      setPreview(false);
    } catch (error) {
      console.error("Error publicando comentario:", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 mt-12 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Novedades y Opiniones</h2>

      {/* Formulario */}
      <form onSubmit={handlePublicar} className="space-y-4">
        <input
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          placeholder="Título del libro"
          className="w-full p-2 border rounded"
        />
        <textarea
          value={comentario}
          onChange={(e) => setComentario(e.target.value)}
          placeholder="Escribe tu comentario, recomendación u opinión"
          className="w-full p-2 border rounded"
          rows={4}
        />

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setPreview(!preview)}
            className="bg-gray-300 px-4 py-2 rounded"
          >
            {preview ? "Ocultar vista previa" : "Ver vista previa"}
          </button>
          <button type="submit" className="bg-blue-700 text-white px-4 py-2 rounded">
            Publicar
          </button>
        </div>
      </form>

      {/* Vista previa */}
      {preview && (titulo || comentario) && (
        <div className="mt-4 p-4 border rounded bg-gray-50">
          <h3 className="font-bold text-lg">{titulo}</h3>
          <p>{comentario}</p>
        </div>
      )}

      {/* Comentarios publicados */}
      <div className="mt-6 space-y-4">
        {comentarios.length === 0 && <p>No hay comentarios todavía.</p>}
        {comentarios.map((c) => (
          <div key={c.id} className="p-4 border rounded bg-gray-50">
            <h3 className="font-bold">{c.titulo}</h3>
            <p>{c.comentario}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
