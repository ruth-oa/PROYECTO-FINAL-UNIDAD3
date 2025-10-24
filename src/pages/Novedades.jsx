import React, { useState } from "react";
import Libros from "../assets/Libros";
import especial from "../imgs/especial.jpeg";
import Mario  from "../imgs/Mario.jpeg";
import { PostCard } from "../componentes/PostCard";
import { Tag } from "../componentes/Tag";


export default function Novedades() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [selectedPost, setSelectedPost] = useState(null);

  const filteredPosts = Libros.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.author.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category ? p.tags.includes(category) : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      {/* 🟦 Banner principal */}
      <a href="#">
        <img
          src="https://www.shutterstock.com/image-vector/bookshelf-childrens-books-on-shelf-260nw-2154792057.jpg"
          alt="Banner principal"
          className="w-full h-64 object-cover rounded-2xl mb-8 shadow-md"
        />
      </a>

      {/* 🟨 Dos imágenes destacadas */}
<div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-center items-center gap-6 mb-10">
  <a href="#" className="block">
    <img
      src={especial}
      alt="Imagen destacada 1"
      className="w-full md:w-[500px] h-64 object-cover rounded-2xl shadow-md hover:opacity-90 transition"
    />
  </a>
  <a href="#" className="block">
    <img
      src={Mario}
      alt="Imagen destacada 2"
      className="w-full md:w-[500px] h-64 object-cover rounded-2xl shadow-md hover:opacity-90 transition"
    />
  </a>
</div>


      <header className="max-w-5xl mx-auto mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-blue-800">
              Rincón de Libros
            </h1>
            <p className="mt-1 text-sm text-gray-600">
              Recomendaciones, reseñas y consejos para lectores curiosos.
            </p>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por título o autor..."
              className="px-3 py-2 rounded-full border border-blue-200 bg-blue-50 text-sm w-64 outline-none focus:ring-2 focus:ring-yellow-300"
            />
            <button
              onClick={() => setCategory("")}
              className="px-4 py-2 rounded-full border border-yellow-300 bg-yellow-100 text-blue-700 text-sm hover:bg-yellow-200"
            >
              Limpiar
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        <section className="lg:col-span-2 space-y-4">
          {selectedPost ? (
            <div className="bg-white rounded-2xl shadow-md border border-blue-100 p-6">
              <img
                src={selectedPost.cover}
                alt={selectedPost.title}
                className="rounded-xl mb-4"
              />
              <h2 className="text-2xl font-bold text-blue-800 mb-2">
                {selectedPost.title}
              </h2>
              <p className="text-sm text-gray-500 mb-4">
                {selectedPost.author} — {selectedPost.date}
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                {selectedPost.content}
              </p>
              <button
                onClick={() => setSelectedPost(null)}
                className="px-4 py-2 bg-yellow-400 text-blue-800 rounded-full text-sm font-semibold hover:bg-yellow-500"
              >
                Volver
              </button>
            </div>
          ) : filteredPosts.length > 0 ? (
            filteredPosts.map((p) => (
              <PostCard key={p.id} post={p} onRead={setSelectedPost} />
            ))
          ) : (
            <p className="text-gray-500">No se encontraron resultados.</p>
          )}
        </section>

        <aside className="space-y-6">
          <div className="bg-blue-50 rounded-2xl p-6 shadow-md border border-blue-100">
            <h4 className="font-semibold text-blue-800 mb-2">Categorías</h4>
            <div className="flex flex-wrap gap-2">
              {["Clásicos", "Recomendados", "Hábitos", "Productividad", "Autores"].map(
                (cat) => (
                  <Tag
                    key={cat}
                    onClick={() => setCategory(category === cat ? "" : cat)}
                    active={category === cat}
                  >
                    {cat}
                  </Tag>
                )
              )}
            </div>
          </div>

          <div className="bg-yellow-50 rounded-2xl p-6 shadow-md border border-yellow-100">
            <h4 className="font-semibold text-blue-800 mb-3">Suscríbete</h4>
            <p className="text-sm text-gray-700 mb-3">
              Recibe las últimas entradas en tu correo.
            </p>
            <div className="flex gap-2">
              <input
                placeholder="tucorreo@mail.com"
                className="flex-1 px-3 py-2 rounded-full border border-blue-200 bg-white text-sm outline-none focus:ring-2 focus:ring-yellow-300"
              />
              <button className="px-4 py-2 rounded-full bg-yellow-400 text-blue-800 text-sm font-semibold hover:bg-yellow-500">
                Unirme
              </button>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}