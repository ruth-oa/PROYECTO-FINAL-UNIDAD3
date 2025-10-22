// src/pages/Inicio.jsx
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

    {/* Encabezado principal */}
        <section className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-800">
            Bienvenido a <span className="text-blue-800">LibroMundo</span>
          </h1>
          <p className="text-gray-600 mt-3 text-lg">
            Descubre libros que te inspiren, te transformen y te acompañen cada día.
          </p>
        </section>

        {/* ✅ CARRUSEL HERO */}
        <HeroCarousel />

        


        {/* Más vendidos dinámico con BookRow */}
        <BookRow title="📚 Más Vendidos" subject="bestsellers" onAdd={addToCart} />

                {/* Título de bienvenida */}
        <section className="mb-10">
          <div className="rounded-lg p-8 bg-gradient-to-r from-blue-700 to-blue-500 text-white">
            <h1 className="text-4xl font-extrabold">Descubre las ultimas nvoedades 🚀</h1>
            <p className="mt-2">Miles de títulos te esperan en LibroMundo.</p>
          </div>
        </section>

        {/* ✍️ Autores destacados */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Autores destacados
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {usersData.slice(0, 4).map((u) => (
              <div
                key={u.id}
                className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition"
              >
                <UserCard user={u} />
              </div>
            ))}
          </div>
        </section>

         {/* 💬 Reseñas */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-8 text-center">
            Opiniones de nuestros lectores
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { id: 1, nombre: "María P.", texto: "Los libros siempre llegan a tiempo y en perfecto estado." },
              { id: 2, nombre: "Carlos R.", texto: "Excelente atención, me ayudaron a elegir el mejor regalo." },
              { id: 3, nombre: "Lucía G.", texto: "Una experiencia relajante, perfecta para los amantes de la lectura." },
              { id: 4, nombre: "Javier M.", texto: "Encuentro todo tipo de géneros y a muy buen precio." },
            ].map((r) => (
              <div
                key={r.id}
                className="bg-white border border-gray-100 p-6 rounded-lg shadow-sm hover:shadow-md transition"
              >
                <p className="italic text-gray-700">“{r.texto}”</p>
                <p className="mt-4 text-sm font-semibold text-blue-700">– {r.nombre}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}