import React from "react";
import { usersData } from "../assets/usuarios";
import { useCart } from "../context/cartContext";
import HeroCarousel from "../componentes/HeroCarousel";
import BookRow from "../componentes/BookRow";
import { UserCard } from "../componentes/UserCard";
import { Comentarios } from "../componentes/Comentarios";

export default function Inicio() {
  const { addToCart } = useCart();

  return (
    <div className="min-h-screen">
      <main className="max-w-7xl mx-auto px-4 py-8">

        {/* ✅ CARRUSEL HERO */}
        <HeroCarousel />

        {/* Título de bienvenida */}
        <section className="mb-10">
          <div className="rounded-lg p-8 bg-gradient-to-r from-blue-700 to-blue-500 text-white">
            <h1 className="text-4xl font-extrabold">Descubre tu próxima aventura 🚀</h1>
            <p className="mt-2">Miles de títulos te esperan en LibroMundo.</p>
          </div>
        </section>

        {/* Más vendidos dinámico con BookRow */}
        <BookRow title="📚 Más Vendidos" subject="bestsellers" onAdd={addToCart} />

        {/* Autores destacados */}
        <section className="mb-8 bg-transparent">
          <h2 className="text-2xl font-bold mb-4">Autores Destacados</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {usersData.slice(0, 4).map((u) => (
              <UserCard key={u.id} user={u} />
            ))}
          </div>
        </section>

        {/* Reseñas */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Reseñas</h2>
          <Comentarios />
        </section>

      </main>
    </div>
  );
}
