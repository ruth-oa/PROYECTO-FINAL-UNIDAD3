// src/componentes/BookCard.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function BookCard({ book, onAdd }) {
  return (
    <div
      className="
        bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300
        flex-shrink-0 w-[110px] sm:w-[140px] md:w-[160px]
      "
    >
      {/* Imagen del libro */}
      <Link to={`/detalle/${book.id}`}>
        <img
          src={book.imgLink}
          alt={book.title}
          className="w-full h-[150px] sm:h-[180px] md:h-[200px] object-cover rounded-t-lg"
        />
      </Link>

      {/* Contenido */}
      <div className="p-2">
        <h3 className="font-semibold text-gray-900 text-xs sm:text-sm line-clamp-2">
          {book.title}
        </h3>
        <p className="text-gray-600 text-[0.7rem] sm:text-xs line-clamp-1">
          {book.author}
        </p>

        <div className="mt-2 flex items-center justify-between">
          <span className="text-[0.8rem] font-bold text-blue-700">
            {book.priceDisplay ?? `$${book.price}`}
          </span>
          <button
            onClick={() => onAdd(book)}
            className="text-[0.7rem] bg-yellow-300 text-blue-900 px-2 py-[2px] rounded-full hover:scale-105 transition"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
