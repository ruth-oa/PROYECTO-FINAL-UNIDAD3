// src/componentes/NavBar.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../context/userContext";
import { useCart } from "../context/cartContext";
import { Menu, X } from "lucide-react";

export default function NavBar() {
  const { user, logout } = useUser();
  const { cart } = useCart();
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    // 🔍 Envía el parámetro q al catálogo
    navigate(`/catalogo?q=${encodeURIComponent(query.trim())}`);
    setMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      {/* ---- NAV SUPERIOR ---- */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between gap-3 overflow-x-hidden">

        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-primary">
          📘 LibMundo
        </Link>

        {/* 🔍 Buscador (desktop) */}
        <form
          onSubmit={handleSearch}
          className="hidden md:flex items-center w-1/2 border rounded-md overflow-hidden"
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar libros o autores..."
            className="flex-1 px-3 py-2 outline-none"
          />
          <button
            type="submit"
            className="bg-primary text-white px-4 py-2 hover:bg-blue-800 transition"
          >
            🔍
          </button>
        </form>

        {/* Carrito + Usuario + Menú */}
        <div className="flex items-center gap-4">
          {/* Menú móvil */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-2xl text-gray-700"
          >
            {menuOpen ? <X /> : <Menu />}
          </button>

          {/* Carrito */}
          <Link to="/carrito" className="relative">
            <span className="text-2xl">🛒</span>
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-accent text-primary rounded-full text-xs px-2 font-bold">
                {cart.reduce((s, b) => s + (b.quantity || 1), 0)}
              </span>
            )}
          </Link>

          {/* Usuario */}
          {user ? (
            <div className="relative group">
              <button className="font-semibold text-primary hover:text-blue-800 transition">
                {user.name} ⬇
              </button>
              <div className="absolute right-0 mt-2 hidden group-hover:block bg-white border rounded-md shadow-md w-40 py-2">
                <Link to="/perfil" className="block px-4 py-2 hover:bg-gray-100">
                  Perfil
                </Link>
                <button
                  onClick={logout}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Cerrar sesión
                </button>
              </div>
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-gray-200 text-blue-700 px-4 py-2 rounded-md font-semibold hover:bg-blue-800 hover:text-white transition"
            >
              Iniciar sesión
            </Link>
          )}
        </div>
      </div>

      {/* ---- NAV INFERIOR ---- */}
      <div className="bg-gray-100 border-t">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-2 md:py-0">
          {/* Buscador visible en móvil */}
          <form
            onSubmit={handleSearch}
            className="flex items-center flex-1 border rounded-md overflow-hidden md:hidden"
          >
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar libros..."
              className="flex-1 px-3 py-2 outline-none text-sm"
            />
            <button
              type="submit"
              className="bg-primary text-white px-4 py-2 hover:bg-blue-800 transition"
            >
              🔍
            </button>
          </form>

          {/* Menú horizontal (desktop) */}
          <nav className="hidden md:flex items-center gap-10 text-gray-700 font-medium">
            <Link to="/catalogo" className="hover:text-primary">
              Los más vendidos
            </Link>
            <Link to="/novedades" className="hover:text-primary">
              Novedades
            </Link>
            <Link to="/ficcion" className="hover:text-primary">
              Ficción
            </Link>
            <Link to="/no-ficcion" className="hover:text-primary">
              No Ficción
            </Link>
            <Link to="/infantil" className="hover:text-primary">
              Infantil
            </Link>
            <Link to="/juvenil" className="hover:text-primary">
              Juvenil
            </Link>
          </nav>
        </div>

        {/* Menú desplegable móvil */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t">
            <nav className="flex flex-col text-gray-700 font-medium px-4 py-2 space-y-2">
              <Link to="/catalogo" onClick={() => setMenuOpen(false)} className="hover:text-primary">
                Los más vendidos
              </Link>
              <Link to="/novedades" onClick={() => setMenuOpen(false)} className="hover:text-primary">
                Novedades
              </Link>
              <Link to="/ficcion" onClick={() => setMenuOpen(false)} className="hover:text-primary">
                Ficción
              </Link>
              <Link to="/no-ficcion" onClick={() => setMenuOpen(false)} className="hover:text-primary">
                No Ficción
              </Link>
              <Link to="/infantil" onClick={() => setMenuOpen(false)} className="hover:text-primary">
                Infantil
              </Link>
              <Link to="/juvenil" onClick={() => setMenuOpen(false)} className="hover:text-primary">
                Juvenil
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
