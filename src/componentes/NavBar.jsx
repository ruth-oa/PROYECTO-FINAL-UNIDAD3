import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../context/userContext";
import { useCart } from "../context/cartContext";
import { Menu, X, ShoppingBag, Search, User } from "lucide-react";

export default function NavBar() {
  const { user } = useUser();
  const { cart } = useCart();
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/catalogo?q=${encodeURIComponent(query.trim())}`);
    setMenuOpen(false);
  };

  return (
    <header className="bg-orange-100 shadow-lg sticky top-0 z-50 font-['Poppins']">
      {/* ---- NAV SUPERIOR ---- */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between gap-3 overflow-x-hidden">

        {/* Logo */}
        <Link to="/" className="text-3xl font-extrabold text-orange-400 hover:scale-105 transition-transform">
          LibroMundo
        </Link>

        {/* 🔍 Buscador (desktop) */}
        <form
          onSubmit={handleSearch}
          className="hidden md:flex items-center w-1/2 bg-white border border-purple-200 rounded-full shadow-sm overflow-hidden focus-within:ring-2 focus-within:ring-purple-300"
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar libros o autores..."
            className="flex-1 px-4 py-3 outline-none bg-transparent text-gray-700 placeholder-gray-400"
          />
          <button
            type="submit"
            className="text-indigo-500 px-4 py-2 flex items-center justify-center hover:text-purple-800 transition"
          >
            <Search size={20} />
          </button>
        </form>

        {/* Carrito + Usuario + Menú */}
        <div className="flex items-center gap-4">
          {/* Menú móvil */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-2xl text-indigo-500"
          >
            {menuOpen ? <X /> : <Menu />}
          </button>

          {/* Carrito */}
          <Link to="/carrito" className="relative">
            <ShoppingBag
              size={26}
              className="text-indigo-500 hover:text-indigo-800 transition"
            />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-pink-400 text-white rounded-full text-xs px-2 font-bold shadow">
                {cart.reduce((s, b) => s + (b.quantity || 1), 0)}
              </span>
            )}
          </Link>

          {/* Usuario */}
          {user ? (
            <Link
              to="/perfil"
              className="flex items-center gap-1 font-semibold text-indigo-500 hover:text-purple-900 transition"
            >
              <User className="w-5 h-5" />
              {user.name}
            </Link>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-1 bg-indigo-500 text-white px-4 py-2 rounded-full font-semibold hover:bg-purple-600 shadow-md transition"
            >
              <User className="w-5 h-5" />
              Iniciar sesión
            </Link>
          )}
        </div>
      </div>

      {/* ---- NAV INFERIOR ---- */}
      <div className="bg-orange-200 border-t border-purple-200">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center px-4 py-4 md:py-3">

          {/* Buscador visible en móvil */}
          <form
            onSubmit={handleSearch}
            className="flex items-center flex-1 border rounded-full overflow-hidden md:hidden bg-white border-purple-200 shadow-sm"
          >
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar libros..."
              className="flex-1 px-3 py-3 outline-none text-sm bg-transparent"
            />
            <button
              type="submit"
              className="bg-purple-500 text-white px-4 py-3 hover:bg-purple-600 transition"
            >
              <Search size={18} />
            </button>
          </form>

          {/* Menú horizontal (desktop) */}
          <nav className="hidden md:flex items-center gap-10 text-black font-medium text-lg">
            <Link to="/catalogo" className="relative  transition group">
              Los más vendidos
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-orange-400 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link to="/novedades" className="relative  transition group">
              Blog
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-orange-400 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link to="/catalogo/ficcion" className="relative transition group">
              Ficción
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-orange-400 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link to="/catalogo/no-ficcion" className="relative  transition group">
              No Ficción
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-orange-400 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link to="/catalogo/infantil" className="relative  transition group">
              Infantil
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-orange-400 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link to="/catalogo/juvenil" className="relative  transition group">
              Juvenil
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-orange-400 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </nav>
        </div>

        {/* Menú desplegable móvil */}
        {menuOpen && (
          <div className="md:hidden bg-purple-100 border-t border-purple-200 shadow-inner">
            <nav className="flex flex-col text-indigo-700 font-medium text-base px-4 py-4 space-y-2">
              <Link to="/catalogo" onClick={() => setMenuOpen(false)} className="hover:text-purple-900 hover:pl-2 transition-all duration-200">
                Los más vendidos
              </Link>
              <Link to="/novedades" onClick={() => setMenuOpen(false)} className="hover:text-purple-900 hover:pl-2 transition-all duration-200">
                Blog
              </Link>
              <Link to="/ficcion" onClick={() => setMenuOpen(false)} className="hover:text-purple-900 hover:pl-2 transition-all duration-200">
                Ficción
              </Link>
              <Link to="/no-ficcion" onClick={() => setMenuOpen(false)} className="hover:text-purple-900 hover:pl-2 transition-all duration-200">
                No Ficción
              </Link>
              <Link to="/infantil" onClick={() => setMenuOpen(false)} className="hover:text-purple-900 hover:pl-2 transition-all duration-200">
                Infantil
              </Link>
              <Link to="/juvenil" onClick={() => setMenuOpen(false)} className="hover:text-purple-900 hover:pl-2 transition-all duration-200">
                Juvenil
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}