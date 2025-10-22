// src/pages/Inicio.jsx
import React from "react";
import { usersData } from "../assets/usuarios";
import { useCart } from "../context/cartContext";
import HeroCarousel from "../componentes/HeroCarousel";
import BookRow from "../componentes/BookRow";
import { UserCard } from "../componentes/UserCard";
import { Comentarios } from "../componentes/Comentarios";
import Slider from "react-slick";
import { ChevronLeft, ChevronRight } from "lucide-react";

// 🔹 Flecha siguiente personalizada
function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-yellow-400 text-blue-900 hover:bg-yellow-300 rounded-full p-2 cursor-pointer shadow-md`}
      style={{ ...style }}
      onClick={onClick}
    >
      <ChevronRight size={24} />
    </div>
  );
}

// 🔹 Flecha anterior personalizada
function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-yellow-400 text-blue-900 hover:bg-yellow-300 rounded-full p-2 cursor-pointer shadow-md`}
      style={{ ...style }}
      onClick={onClick}
    >
      <ChevronLeft size={24} />
    </div>
  );
}

export default function Inicio() {
  const { addToCart } = useCart();

  return (
    <div className="min-h-screen bg-[#f9f9f9]">
      <main className="max-w-7xl mx-auto px-4 py-10">

        {/* 🧭 Carrusel principal */}
        <section className="mb-12">
          <HeroCarousel />
        </section>

        {/* Encabezado principal */}
        <section className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-800">
            Bienvenido a <span className="text-blue-800">LibroMundo</span>
          </h1>
          <p className="text-gray-600 mt-3 text-lg">
            Descubre libros que te inspiren, te transformen y te acompañen cada día.
          </p>
        </section>

        <BookRow
  title="📚 Más Vendidos"
  books={[
    { id: 1, title: "El Último Secreto", author: "Dan Brown", price: 19.99, imgLink: "https://imagessl3.casadellibro.com/a/l/s5/63/9788408306863.webp " },
    { id: 2, title: "El recluso", author: "Freida McFadden", price: 25.5, imgLink: "https://www.hola.com/horizon/original_aspect_ratio/25f8f73881ec-libro-el-recluso.jpg?im=Resize=(960),type=downsize " },
    { id: 3, title: "Crepúsculo", author: "Stephenie Meyer", price: 15.0, imgLink: "https://www.hola.com/horizon/original_aspect_ratio/c482df5608f5-libro-crepusculo.jpg?im=Resize=(960),type=downsize " },
    { id: 4, title: "El círculo de los días", author: "Ken Follet", price: 18.0, imgLink: "https://www.hola.com/horizon/original_aspect_ratio/b94203323ef1-libro-el-circulo-de-los-dias-ken-follet.jpg?im=Resize=(960),type=downsize " },
    { id: 5, title: "Los tres mundos", author: "Santiago Posteguillo", price: 22.0, imgLink: "https://imagessl1.casadellibro.com/a/l/s5/01/9788466682701.webp " },
  ]}
  onAdd={addToCart}
/>

                {/* Título de bienvenida */}
        <section className="mb-10">
          <div className="rounded-lg p-8 bg-gradient-to-r from-blue-700 to-blue-500 text-white">
            <h1 className="text-4xl font-extrabold">Descubre las ultimas nvoedades 🚀</h1>
            <p className="mt-2">Miles de títulos te esperan en LibroMundo.</p>
          </div>
        </section>

        {/* Autores destacados */}
       <section className="mb-16">
  <h2 className="text-3xl font-extrabold mb-6 text-blue-900 text-center">
    Autores Destacados ✨
  </h2>

  <div className="relative bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl shadow-xl p-6">
    <Slider
      dots={false}
      infinite={true}
      speed={600}
      slidesToShow={4}
      slidesToScroll={1}
      autoplay={true}
      autoplaySpeed={3500}
      arrows={true}
      nextArrow={<SampleNextArrow />}
      prevArrow={<SamplePrevArrow />}
      responsive={[
        { breakpoint: 1024, settings: { slidesToShow: 3 } },
        { breakpoint: 768, settings: { slidesToShow: 2 } },
        { breakpoint: 480, settings: { slidesToShow: 1 } },
      ]}
    >
      {usersData.slice(0, 8).map((u) => (
        <div key={u.id} className="px-4">
          <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1 p-4 text-center">
            <UserCard user={u} />
          </div>
        </div>
      ))}
    </Slider>
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
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
