// src/componentes/BookCard.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function BookCard({ book, onAdd }) {
  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col">
      <img src={book.imgLink} alt={book.title} className="h-44 object-cover rounded" />
      <h3 className="mt-3 font-semibold">{book.title}</h3>
      <p className="text-sm text-gray-600">{book.author}</p>
      <div className="mt-auto flex items-center justify-between">
        <div className="font-bold text-lg">{book.priceDisplay ?? `$${book.price}`}</div>
        <div className="flex items-center gap-2">
          <button onClick={() => onAdd(book)} className="px-3 py-1 bg-yellow-300 text-blue-900 rounded">Añadir</button>
          <Link to={`/detalle/${book.id}`} className="text-sm underline">Ver</Link>
        </div>
      </div>
    </div>
  );
}
