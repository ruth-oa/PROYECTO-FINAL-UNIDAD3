import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function BookRow({ title, books = [], onAdd }) {
  const settings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section className="mb-10"> {/* menos espacio inferior */}
      <h2 className="text-xl font-semibold mb-4 text-gray-800">{title}</h2>

      <Slider {...settings}>
        {books.map((book) => (
          <div key={book.id} className="px-2"> {/* menos padding lateral */}
            <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center text-center p-4 border border-gray-100">
              
              {/* Imagen centrada */}
              <div className="w-full flex justify-center mb-3">
                <img
                  src={book.imgLink}
                  alt={book.title}
                  className="w-32 h-48 object-cover rounded-md"
                />
              </div>

              {/* Información */}
              <h3 className="text-base font-medium text-gray-800 mb-1">{book.title}</h3>
              <p className="text-sm text-gray-500 mb-1">{book.author}</p>
              <p className="text-gray-700 font-semibold mb-3">S/ {book.price.toFixed(2)}</p>

              {/* Botón más compacto */}
              <button
                onClick={() => onAdd(book)}
                className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
              >
                Añadir al carrito
              </button>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
}