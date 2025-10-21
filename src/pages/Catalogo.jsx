import React from "react";
import BookCard from "../componentes/BookCard";
import { useCart } from "../context/cartContext";

export default function Catalogo() {
  const { addToCart } = useCart();

  const secciones = [
    {
      titulo: "🏅 Premio Nobel de Literatura",
      libros: [
        { id: 1, title: "Voces de Chernóbil", author: "Svetlana Alexievich", price: 39.9, imgLink: "https://www.elvirrey.com/imagenes/9786124/978612426267.GIF" },
        { id: 2, title: "Letras completas 1962-2012", author: "Bob Dylan", price: 55.0, imgLink: "https://www.diariofolk.com/wp-content/uploads/2017/01/dylan-malpaso.jpg" },
        { id: 3, title: "Los restos del día", author: "Kazuo Ishiguro", price: 32.5, imgLink: "https://cms.anagrama-ed.es/uploads/media/portadas/0001/16/7fe48a7f5f586fa10c1be5219edc00c38d995dfa.jpeg" },
        { id: 4, title: "Los errantes", author: "Olga Tokarczuk", price: 28.5, imgLink: "https://cms.anagrama-ed.es/uploads/media/portadas/0001/23/7494c6c4f113716984ae22c5576459a8e82f5ca2.jpeg" },
        { id: 5, title: "El miedo del portero al penalti", author: "Peter Handke", price: 25.9, imgLink: "https://www.penguinlibros.com/pe/3502768/el-miedo-del-portero-al-penalti.jpg" },
        { id: 6, title: "La vegetariana", author: "Han Kang", price: 35.0, imgLink: "https://www.penguinlibros.com/pe/4593277/la-vegetariana.jpg" },
      ],
    },
    {
      titulo: "🔥 Los más leídos",
      libros: [
        { id: 7, title: "El último secreto", author: "Dan Brown", price: 45.0, imgLink: "https://imagessl3.casadellibro.com/a/l/s5/63/9788408306863.webp" },
        { id: 8, title: "El recluso", author: "Freida McFadden", price: 42.0, imgLink: "https://www.hola.com/horizon/original_aspect_ratio/25f8f73881ec-libro-el-recluso.jpg?im=Resize=(960),type=downsize" },
        { id: 9, title: "El círculo de los días", author: "Ken Follet", price: 49.9, imgLink: "https://www.hola.com/horizon/original_aspect_ratio/b94203323ef1-libro-el-circulo-de-los-dias-ken-follet.jpg?im=Resize=(960),type=downsize" },
        { id: 10, title: "Los tres mundos", author: "Santiago Posteguillo", price: 38.9, imgLink: "https://imagessl1.casadellibro.com/a/l/s5/01/9788466682701.webp" },
      ],
    },
    {
      titulo: "💖 Romance",
      libros: [
        { id: 11, title: "Orgullo y Prejuicio", author: "Jane Austen", price: 19.9, imgLink: "https://www.elvirrey.com/imagenes/9788415/978841561878.GIF" },
        { id: 12, title: "El amor en los tiempos del cólera", author: "Gabriel García Márquez", price: 22.9, imgLink: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLBI3-fxXadQ5fywcC987mIEWxk_lYYUWPGw&s" },
        { id: 13, title: "La hipótesis del amor", author: "Ali Hazelwood", price: 24.5, imgLink: "https://iberoperu.vtexassets.com/arquivos/ids/259223-800-1156?v=637970077803930000&width=800&height=1156&aspect=true" },
        { id: 14, title: "Romper el círculo", author: "Colleen Hoover", price: 26.9, imgLink: "https://images.cdn3.buscalibre.com/fit-in/360x360/aa/c4/aac495a3ef1a84293a0e7771c26b5c4e.jpg" },
      ],
    },
    {
      titulo: "🚀 Ciencia ficción",
      libros: [
        { id: 15, title: "1984", author: "George Orwell", price: 18.5, imgLink: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtAzNIc5fpBTO-bqLX4w5QDJfEVDHbJp-Ptg&s" },
        { id: 16, title: "Dune", author: "Frank Herbert", price: 40.0, imgLink: "https://images.cdn2.buscalibre.com/fit-in/360x360/0d/73/0d739e6e0e837d7637f97f9aad3639b4.jpg" },
        { id: 17, title: "Fahrenheit 451", author: "Ray Bradbury", price: 20.5, imgLink: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRb9nGJedxNrEXSt2ydrENeLju_ONeI7gMEig&s" },
      ],
    },
    {
      titulo: "👻 Terror",
      libros: [
        { id: 18, title: "Drácula", author: "Bram Stoker", price: 19.9, imgLink: "https://images.cdn2.buscalibre.com/fit-in/360x360/15/e5/15e55a11bf7ab69d43d90567a7b55827.jpg" },
        { id: 19, title: "It", author: "Stephen King", price: 39.9, imgLink: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTOMQxy4yKycBdzFj0uId3TOxtvyplk5F6TA&s" },
        { id: 20, title: "Cuentos extraordinarios", author: "Edgar Allan Poe", price: 22.0, imgLink: "https://images.cdn3.buscalibre.com/fit-in/360x360/40/33/403322b76b92a9cca36c51f7ceb85926.jpg" },
      ],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {secciones.map((sec, i) => (
        <section key={i} className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-primary border-b-4 border-blue-200 inline-block pb-2">
            {sec.titulo}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {sec.libros.map((book) => (
              <BookCard key={book.id} book={book} onAdd={addToCart} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
