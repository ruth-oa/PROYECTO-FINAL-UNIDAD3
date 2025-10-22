// src/pages/Catalogo.jsx
import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import BookCard from "../componentes/BookCard";

const CATEGORIES = [
  { key: "love", name: "💖 Romance" },
  { key: "science_fiction", name: "🚀 Ciencia Ficción" },
  { key: "fantasy", name: "🧙‍♀️ Fantasía" },
  { key: "history", name: "📜 Historia" },
  { key: "mystery", name: "🕵️ Misterio" },
];

const LANGUAGES = [
  { key: "en", name: "Inglés" },
  { key: "es", name: "Español" },
  { key: "fr", name: "Francés" },
];

export default function Catalogo() {
  const location = useLocation();
  const queryParam = new URLSearchParams(location.search).get("q") || "";

  const [booksByCategory, setBooksByCategory] = useState({});
  const [searchResults, setSearchResults] = useState([]);
  const [offsets, setOffsets] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [sortOption, setSortOption] = useState("");

  const containerRefs = useRef({});

  // ===============================
  //      FETCH LIBROS POR CATEGORÍA
  // ===============================
  const fetchBooks = async (catKey, offset = 0, append = false) => {
    try {
      const res = await fetch(
        `https://openlibrary.org/subjects/${catKey}.json?limit=100&offset=${offset}`
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
          pages: b.number_of_pages_median ?? Math.floor(Math.random() * 400 + 50),
          price: price,
          priceDisplay: `$${price}`, // agregado
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
      console.error("Error cargando libros para", catKey, err);
    }
  };

  // ===============================
  //       FETCH RESULTADOS BUSQUEDA
  // ===============================
  const fetchSearchResults = async (query) => {
    if (!query) return;
    try {
      const res = await fetch(
        `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=20`
      );
      const data = await res.json();

      const formatted = (data.docs || []).map((b) => {
        const price = parseFloat((Math.random() * 30 + 10).toFixed(2));
        return {
          id: b.key.replace("/works/", ""),
          imgLink: b.cover_i
            ? `https://covers.openlibrary.org/b/id/${b.cover_i}-M.jpg`
            : "https://via.placeholder.com/150x220?text=Sin+Portada",
          title: b.title,
          author: b.author_name?.[0] ?? "Autor desconocido",
          pages: b.number_of_pages_median ?? Math.floor(Math.random() * 400 + 50),
          price: price,
          priceDisplay: `$${price}`, // agregado
          language: b.language?.[0] ?? "en",
          category: "", // en búsqueda no tenemos categoría
        };
      });

      setSearchResults(formatted);
    } catch (err) {
      console.error("Error buscando libros:", err);
    }
  };

  // ===============================
  //           EFECTOS
  // ===============================
  useEffect(() => {
    if (!queryParam) {
      CATEGORIES.forEach((cat) => fetchBooks(cat.key, 0, false));
    }
  }, [queryParam]);

  useEffect(() => {
    if (queryParam) {
      fetchSearchResults(queryParam);
    }
  }, [queryParam]);

  // ===============================
  //          SCROLL INFINITO
  // ===============================
  useEffect(() => {
    if (queryParam) return;

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
  }, [offsets, queryParam]);

  // ===============================
  //       HANDLERS
  // ===============================
  const handleAdd = (book) => console.log("Añadido al carrito:", book);
  const handleCategoryChange = (catKey) =>
    setSelectedCategory(selectedCategory === catKey ? "" : catKey);
  const handleLanguageChange = (langKey) =>
    setSelectedLanguage(selectedLanguage === langKey ? "" : langKey);
  const handlePriceChange = (min, max) => setPriceRange([min, max]);
  const handleSortChange = (option) => setSortOption(option);

  // ===============================
  //          FILTROS Y ORDENAMIENTO
  // ===============================
  const applyFilters = (books) => {
    let filtered = [...books];

    if (selectedCategory) {
      filtered = filtered.filter((b) => b.category === selectedCategory);
    }

    if (selectedLanguage) {
      filtered = filtered.filter((b) => b.language === selectedLanguage);
    }

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

  // ===============================
  //          RENDER
  // ===============================
  const booksToRender = queryParam
    ? applyFilters(searchResults)
    : applyFilters(Object.values(booksByCategory).flat());

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-6 flex gap-6">
      {/* -------- SIDEBAR FILTROS -------- */}
      <aside className="w-64 bg-white p-4 rounded shadow space-y-6">
        <h3 className="font-bold text-lg">Filtros</h3>

        {/* Categorías */}
        <div>
          <h4 className="font-semibold mb-2">Categorías</h4>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              onClick={() => handleCategoryChange(cat.key)}
              className={`block w-full text-left px-2 py-1 rounded ${
                selectedCategory === cat.key ? "bg-blue-100" : "hover:bg-gray-100"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Idiomas */}
        <div>
          <h4 className="font-semibold mb-2">Idioma</h4>
          {LANGUAGES.map((lang) => (
            <button
              key={lang.key}
              onClick={() => handleLanguageChange(lang.key)}
              className={`block w-full text-left px-2 py-1 rounded ${
                selectedLanguage === lang.key ? "bg-blue-100" : "hover:bg-gray-100"
              }`}
            >
              {lang.name}
            </button>
          ))}
        </div>

        {/* Precio */}
        <div>
          <h4 className="font-semibold mb-2">Precio</h4>
          <input
            type="range"
            min={0}
            max={100}
            value={priceRange[1]}
            onChange={(e) => handlePriceChange(0, parseInt(e.target.value))}
            className="w-full"
          />
          <p>Hasta ${priceRange[1]}</p>
        </div>
      </aside>

      {/* -------- MAIN CONTENT -------- */}
      <main className="flex-1">
        {/* Toolbar superior */}
        <div className="flex items-center justify-end gap-4 mb-4">
          <select
            onChange={(e) => handleSortChange(e.target.value)}
            className="border rounded px-2 py-1"
          >
            <option value="">Ordenar por</option>
            <option value="alphaAsc">Título A-Z</option>
            <option value="alphaDesc">Título Z-A</option>
            <option value="pagesAsc">Páginas ↑</option>
            <option value="pagesDesc">Páginas ↓</option>
          </select>
        </div>

        {/* Grid de libros */}
        {booksToRender.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {booksToRender.map((book) => (
              <BookCard key={book.id} book={book} onAdd={handleAdd} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No se encontraron libros...</p>
        )}
      </main>
    </div>
  );
}
