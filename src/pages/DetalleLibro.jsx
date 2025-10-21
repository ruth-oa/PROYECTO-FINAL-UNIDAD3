// src/pages/DetalleLibro.jsx
import React from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/cartContext";

/* Ejemplo: en real buscarías por ID en API */
const sampleBooks = [
  { id: 1, title: "El Jardín de Papel", author: "A. Pérez", price: 19.99, imgLink: "/src/assets/book-1.jpg", desc: "Una novela..." },
  { id: 2, title: "Código Secreto", author: "M. López", price: 25.5, imgLink: "/src/assets/book-2.jpg", desc: "Thriller tecnológico..." },
];

export default function DetalleLibro() {
  const { id } = useParams();
  const book = sampleBooks.find(b => String(b.id) === id);
  const { addToCart } = useCart();

  if (!book) return <div className="p-6">Libro no encontrado.</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex gap-6">
        <img src={book.imgLink} alt={book.title} className="w-64 h-80 object-cover rounded" />
        <div>
          <h1 className="text-2xl font-bold">{book.title}</h1>
          <p className="text-sm text-gray-700">{book.author}</p>
          <p className="mt-4">{book.desc}</p>
          <div className="mt-6 flex items-center gap-4">
            <div className="text-2xl font-bold">${book.price}</div>
            <button onClick={() => addToCart(book)} className="bg-yellow-300 text-blue-900 px-4 py-2 rounded">Añadir al carrito</button>
          </div>
        </div>
      </div>
    </div>
  );
}
