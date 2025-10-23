import React from "react";
import CatalogoBase from "../componentes/CatalogoBase";

const CATEGORIAS_FICCION = [
  { key: "science_fiction", name: "🚀 Ciencia Ficción" },
  { key: "fantasy", name: "🧙‍♂️ Fantasía" },
  { key: "mystery", name: "🕵️ Misterio" },
  { key: "love", name: "💖 Romance" },
];

export default function Ficcion() {
  return <CatalogoBase categorias={CATEGORIAS_FICCION} />;
}
