// src/componentes/BookRow.jsx
import React, { useEffect, useRef, useState } from "react";
import BookCard from "./BookCard";

export default function BookRow({ title, subject }) {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  // función para traer libros de Open Library
  const fetchBooks = async (pageNum) => {
    try {
      setLoading(true);
      const res = await fetch(
        `https://openlibrary.org/search.json?subject=${encodeURIComponent(
          subject
        )}&page=${pageNum}&limit=12`
      );
      const data = await res.json();

      const newBooks = data.docs.map((b) => {
        const price = (Math.random() * 30 + 10).toFixed(2); // precio aleatorio entre 10 y 40
        return {
          id: b.key,
          title: b.title,
          author: b.author_name ? b.author_name[0] : "Autor desconocido",
          imgLink: b.cover_i
            ? `https://covers.openlibrary.org/b/id/${b.cover_i}-M.jpg`
            : "https://via.placeholder.com/150x220?text=Sin+Portada",
          price: price,
          priceDisplay: `$${price}`,
        };
      });

      // si ya no hay más resultados
      if (newBooks.length === 0) setHasMore(false);

      setBooks((prev) => [...prev, ...newBooks]);
    } catch (err) {
      console.error("Error cargando libros:", err);
    } finally {
      setLoading(false);
    }
  };

  // carga inicial
  useEffect(() => {
    fetchBooks(1);
  }, [subject]);

  // detectar cuando se scrollea al final
  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el || loading || !hasMore) return;

    const rightEdge = el.scrollLeft + el.clientWidth;
    if (rightEdge >= el.scrollWidth - 100) {
      setPage((prev) => prev + 1);
    }
  };

  // cargar más cuando cambia la página
  useEffect(() => {
    if (page > 1) fetchBooks(page);
  }, [page]);

  return (
    <section className="mb-6">
      <h2 className="text-lg font-bold text-gray-800 mb-2 px-2">{title}</h2>
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="
          flex gap-3 overflow-x-auto scrollbar-hide px-2
          snap-x snap-mandatory scroll-smooth
        "
      >
        {books.map((book) => (
          <div key={book.id} className="snap-start min-w-[130px]">
            <BookCard book={book} />
          </div>
        ))}

        {loading && (
          <div className="flex items-center justify-center px-4 text-gray-400">
            Cargando más libros...
          </div>
        )}
      </div>
    </section>
  );
}
