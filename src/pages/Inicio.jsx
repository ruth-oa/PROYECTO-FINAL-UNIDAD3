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

        {/* Reseñas */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Reseñas</h2>
          <Comentarios />
        </section>

      </main>
    </div>
  );
}
