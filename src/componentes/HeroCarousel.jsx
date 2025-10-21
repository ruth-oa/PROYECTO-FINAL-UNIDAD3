import React from "react";
import Slider from "react-slick";
import HeroSlide from "./HeroSlide";
import halloweenImg from "../imgs/Halloween.png";
import festivalImg from "../imgs/Festival.png";
import mangaImg from "../imgs/bitch.png";

const slides = [
  {
    img: halloweenImg,
    title: "Especial Halloween",
    text: "Descuentos de temporada",
    btnText: "Ver catálogo",
    btnLink: "#catalogo",
    fontClass: "[font-family:'Creepster',cursive]"
  },
  {
    img: festivalImg,
    title: "Regala emociones",
    text: "Crea momentos que perduran",
    btnText: "Ver más promociones",
    btnLink: "#catalogo",
  },
  {
    img: mangaImg,
    title: "Detalles únicos",
    text: "Cada pieza con amor y dedicación",
    btnText: "¡Participa!",
    btnLink: "#catalogo",
  },
];


export default function HeroCarousel() {
  const settings = { dots: true, infinite: true, autoplay: true, autoplaySpeed: 4000 };

  return (
    <section className="hero mb-10">
      <Slider {...settings}>
        {slides.map((s, i) => (
          <HeroSlide key={i} {...s} />
        ))}
      </Slider>
    </section>
  );
}
