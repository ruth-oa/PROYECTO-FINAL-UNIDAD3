import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import BookCard from "../componentes/BookCard";
import ficcionImg from "../imgs/ficcion.png";
import noficcionImg from "../imgs/noficcion.png";
import infantilImg from "../imgs/niños.png";
import juvenilImg from "../imgs/jovenes.png";



const CATEGORY_MAP = {
  ficcion: [
    { key: "love", name: "💖 Romance" },
    { key: "fantasy", name: "🧙‍♀️ Fantasía" },
    { key: "science_fiction", name: "🚀 Ciencia Ficción" },
    { key: "mystery", name: "🕵️ Misterio" },
  ],
  "no-ficcion": [
    { key: "history", name: "📜 Historia" },
    { key: "biography", name: "👩‍🏫 Biografía" },
    { key: "self_help", name: "🌱 Autoayuda" },
  ],
  infantil: [
    { key: "children", name: "🐻 Cuentos Infantiles" },
    { key: "education", name: "📚 Educativos" },
    { key: "picture_books", name: "📖 Ilustrados" },
  ],
  juvenil: [
    { key: "young_adult", name: "🎒 Juvenil" },
    { key: "adventure", name: "🗺️ Aventura" },
    { key: "fantasy", name: "🧙‍♀️ Fantasía" },
  ],
};

const CATEGORY_BANNERS = {
  ficcion: {
    title: "Mundos Imaginarios y Aventuras",
    subtitle: "Sumérgete en historias que despiertan tu imaginación.",
    image: ficcionImg,
    gradient: "from-pink-400/70 to-purple-500/70",
  },
  "no-ficcion": {
    title: "Conocimiento y Realidad",
    subtitle: "Explora biografías, historia y sabiduría para crecer.",
    image: noficcionImg,
    gradient: "from-blue-400/70 to-indigo-500/70",
  },
  infantil: {
    title: "Lecturas para los más pequeños",
    subtitle: "Cuentos que educan, inspiran y divierten.",
    image: infantilImg,
    gradient: "from-yellow-300/70 to-orange-400/70",
  },
  juvenil: {
    title: "Historias para jóvenes soñadores",
    subtitle: "Aventuras, desafíos y emociones que te acompañan.",
    image: juvenilImg,
    gradient: "from-green-400/70 to-teal-500/70",
  },
};


const LANGUAGES = [
  { key: "en", name: "Inglés" },
  { key: "es", name: "Español" },
  { key: "fr", name: "Francés" },
];

export default function CatalogoCategoria() {
  const { categoria } = useParams();
  const CATEGORIES = CATEGORY_MAP[categoria] || [];

  const [booksByCategory, setBooksByCategory] = useState({});
  const [offsets, setOffsets] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [sortOption, setSortOption] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const containerRefs = useRef({});

  const fetchBooks = async (catKey, offset = 0, append = false) => {
    try {
      const res = await fetch(
        `https://openlibrary.org/subjects/${catKey}.json?limit=50&offset=${offset}`
      );
      const data = await res.json();

      const formatted = (data.works || []).map((b) => {
        const price = parseFloat((Math.random() * 30 + 10).toFixed(2));
        return {
          id: b.key.replace("/works/", ""),
          imgLink: b.cover_id
            ? `https://covers.openlibrary.org/b/id/${b.cover_id}-M.jpg`
            : "https://via.placeholder.com/150x220?text=Sin+Portada",
          title: b.title,
          author: b.authors?.[0]?.name ?? "Autor desconocido",
          pages:
            b.number_of_pages_median ?? Math.floor(Math.random() * 400 + 50),
          price,
          priceDisplay: `$${price}`,
          language: b.languages?.[0]?.key?.replace("/languages/", "") ?? "en",
          category: catKey,
        };
      });

      setBooksByCategory((prev) => ({
        ...prev,
        [catKey]: append
          ? [...(prev[catKey] || []), ...formatted]
          : formatted,
      }));

      setOffsets((prev) => ({
        ...prev,
        [catKey]: offset + 12,
      }));
    } catch (err) {
      console.error("Error cargando libros:", err);
    }
  };

  useEffect(() => {
    if (CATEGORIES.length === 0) return;
    setBooksByCategory({});
    CATEGORIES.forEach((cat) => fetchBooks(cat.key, 0, false));
  }, [categoria]);

  useEffect(() => {
    const observers = [];
    CATEGORIES.forEach((cat) => {
      const container = containerRefs.current[cat.key];
      if (!container) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              fetchBooks(cat.key, offsets[cat.key] || 12, true);
            }
          });
        },
        { root: container, threshold: 1.0 }
      );

      const sentinel = document.createElement("div");
      sentinel.style.width = "1px";
      sentinel.style.height = "1px";
      container.appendChild(sentinel);

      observer.observe(sentinel);
      observers.push({ observer, container, sentinel });
    });

    return () => {
      observers.forEach(({ observer, container, sentinel }) => {
        observer.unobserve(sentinel);
        container.removeChild(sentinel);
      });
    };
  }, [offsets, categoria]);

  const applyFilters = (books) => {
    let filtered = [...books];
    if (selectedCategory)
      filtered = filtered.filter((b) => b.category === selectedCategory);
    if (selectedLanguage)
      filtered = filtered.filter((b) => b.language === selectedLanguage);
    filtered = filtered.filter(
      (b) => b.price >= priceRange[0] && b.price <= priceRange[1]
    );
    if (sortOption === "alphaAsc")
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    if (sortOption === "alphaDesc")
      filtered.sort((a, b) => b.title.localeCompare(a.title));
    if (sortOption === "pagesAsc") filtered.sort((a, b) => a.pages - b.pages);
    if (sortOption === "pagesDesc") filtered.sort((a, b) => b.pages - a.pages);
    return filtered;
  };

  const handleAdd = (book) => console.log("Añadido al carrito:", book);

  const banner = CATEGORY_BANNERS[categoria];

  return (
    <>
      {banner && (
        <section className="relative w-full h-64 md:h-80 overflow-hidden rounded-b-3xl shadow-lg">
          <img
            src={banner.image}
            alt={banner.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div
            className={`absolute inset-0 bg-gradient-to-r ${banner.gradient}`}
          ></div>
          <div className="relative z-10 flex flex-col items-center justify-center text-center text-white h-full px-4">
            <h2 className="text-3xl md:text-5xl font-extrabold drop-shadow-lg">
              {banner.title}
            </h2>
            <p className="mt-3 text-lg md:text-xl font-medium drop-shadow">
              {banner.subtitle}
            </p>
          </div>
        </section>
      )}

      <div className="min-h-screen bg-gray-50 py-8 px-6 flex flex-col md:flex-row gap-6 font-poppins">
        {/* -------- SIDEBAR FILTROS -------- */}
        <aside
          className={`w-full md:w-72 bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-100 space-y-6 fixed md:static top-0 left-0 h-full z-50 overflow-y-auto transform md:transform-none transition-transform duration-300 ${
            showFilters ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          }`}
        >
          <div className="flex justify-between items-center md:block">
            <h3 className="text-2xl font-extrabold text-gray-800 capitalize border-b pb-2 tracking-wide text-center md:text-left">
              {categoria}
            </h3>
            <button
              onClick={() => setShowFilters(false)}
              className="md:hidden text-gray-500 text-sm"
            >
              ✖
            </button>
          </div>

          {/* Subcategorías */}
          <div>
            <h4 className="font-semibold mb-3 text-blue-800 uppercase text-sm tracking-wide">
              Subcategorías
            </h4>
            <div className="space-y-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() =>
                    setSelectedCategory(
                      selectedCategory === cat.key ? "" : cat.key
                    )
                  }
                  className={`block w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    selectedCategory === cat.key
                      ? "bg-blue-600 text-white shadow-md"
                      : "bg-blue-50 text-gray-700 hover:bg-blue-100"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Idioma */}
          <div>
            <h4 className="font-semibold mb-3 text-blue-800 uppercase text-sm tracking-wide">
              Idioma
            </h4>
            <div className="space-y-2">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.key}
                  onClick={() =>
                    setSelectedLanguage(
                      selectedLanguage === lang.key ? "" : lang.key
                    )
                  }
                  className={`block w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    selectedLanguage === lang.key
                      ? "bg-blue-600 text-white shadow-md"
                      : "bg-blue-50 text-gray-700 hover:bg-blue-100"
                  }`}
                >
                  {lang.name}
                </button>
              ))}
            </div>
          </div>

          {/* Precio */}
          <div>
            <h4 className="font-semibold mb-3 text-blue-800 uppercase text-sm tracking-wide">
              Precio
            </h4>
            <div className="px-2">
              <input
                type="range"
                min={0}
                max={100}
                value={priceRange[1]}
                onChange={(e) =>
                  setPriceRange([0, parseInt(e.target.value)])
                }
                className="w-full accent-blue-600 cursor-pointer"
              />
              <p className="text-sm text-gray-600 mt-2 text-center font-medium">
                Hasta{" "}
                <span className="text-blue-700 font-bold">
                  ${priceRange[1]}
                </span>
              </p>
            </div>
          </div>
        </aside>

        {/* -------- MAIN CONTENT -------- */}
        <main className="flex-1">
          {/* Toolbar superior */}
          <div className="flex items-center justify-between md:justify-end gap-4 mb-4">
            <button
              onClick={() => setShowFilters((prev) => !prev)}
              className="md:hidden bg-blue-600 text-white px-4 py-2 rounded-md shadow"
            >
              {showFilters ? "Cerrar filtros" : "Mostrar filtros"}
            </button>
            <select
              onChange={(e) => setSortOption(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 text-sm shadow-sm"
            >
              <option value="">Ordenar por</option>
              <option value="alphaAsc">Título A-Z</option>
              <option value="alphaDesc">Título Z-A</option>
              <option value="pagesAsc">Páginas ↑</option>
              <option value="pagesDesc">Páginas ↓</option>
            </select>
          </div>

          {/* Grid de libros */}
          {Object.keys(booksByCategory).length === 0 ? (
            <p className="text-gray-500 text-center text-lg">
              Cargando libros...
            </p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {applyFilters(Object.values(booksByCategory).flat()).map(
                (book) => (
                  <BookCard key={book.id} book={book} onAdd={handleAdd} />
                )
              )}
            </div>
          )}
        </main>
      </div>
    </>
  );
}