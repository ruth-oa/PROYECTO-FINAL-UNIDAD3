// src/componentes/NavBar.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../context/userContext";
import { useCart } from "../context/cartContext";

export default function NavBar() {
  const { user, logout } = useUser();
  const { cart } = useCart();
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/catalogo?q=${encodeURIComponent(query)}`);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      {/* ---- NAV SUPERIOR ---- */}
      <div className="max-w-7xl mx-auto px-6 py-3 flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-primary">
          📘 LibroMundo
        </Link>

        {/* Buscador */}
        <form
          onSubmit={handleSearch}
          className="flex items-center w-full md:w-1/2 border rounded-md overflow-hidden"
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

        {/* Carrito + Usuario */}
        <div className="flex items-center gap-4">
          <Link to="/carrito" className="relative">
            <span className="text-2xl">🛒</span>
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-accent text-primary rounded-full text-xs px-2 font-bold">
                {cart.reduce((s, b) => s + (b.quantity || 1), 0)}
              </span>
            )}
          </Link>

          {user ? (
            <div className="relative group">
              <button className="font-semibold text-primary hover:text-blue-800 transition">
                {user.name} ⬇
              </button>
              {/* Dropdown usuario */}
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
              className="bg-primary text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-800 transition"
            >
              Iniciar sesión
            </Link>
          )}
        </div>
      </div>

      {/* ---- NAV INFERIOR (SECCIONES) ---- */}
      <div className="bg-gray-100 border-t">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-10 py-2 text-gray-700 font-medium">
          <Link to="/catalogo" className="hover:text-primary transition-colors">
            Catálogo
          </Link>

          <div className="relative group">
            <span className="cursor-pointer hover:text-primary transition-colors">
              Novedades ⬇
            </span>
            {/* Dropdown */}
            <div className="absolute left-0 mt-1 hidden group-hover:block bg-white border rounded-md shadow-md py-2 w-48">
              <Link
                to="/novedades/infantil"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Literatura Infantil
              </Link>
              <Link
                to="/novedades/juvenil"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Juvenil
              </Link>
              <Link
                to="/novedades/adultos"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Adultos
              </Link>
            </div>
          </div>

          <div className="relative group">
            <span className="cursor-pointer hover:text-primary transition-colors">
              Ofertas ⬇
            </span>
            {/* Dropdown */}
            <div className="absolute left-0 mt-1 hidden group-hover:block bg-white border rounded-md shadow-md py-2 w-48">
              <Link
                to="/ofertas/nuevas"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Nuevas Ofertas
              </Link>
              <Link
                to="/ofertas/especiales"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Especiales
              </Link>
              <Link
                to="/ofertas/clearance"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Liquidación
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
