// src/componentes/UserMenu.jsx
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../context/userContext";

export default function UserMenu() {
  const { user, logout } = useUser();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  // Cierra el menú al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!user) {
    // Cuando no hay usuario → botón Iniciar sesión
    return (
      <Link
        to="/login"
        className="bg-gray-200 text-blue-700 px-4 py-2 rounded-md font-semibold hover:bg-blue-800 hover:text-white transition"
      >
        Iniciar sesión
      </Link>
    );
  }

  return (
    <div className="relative" ref={menuRef}>
      {/* Botón del usuario */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="font-semibold text-primary hover:text-blue-800 transition flex items-center gap-1"
      >
        {user.name}
        <span className="text-sm">▼</span>
      </button>

      {/* Tooltip flotante */}
      {open && (
        <div
          className="absolute right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg w-44 py-2 z-50 animate-fadeIn"
        >
          <Link
            to="/perfil"
            onClick={() => setOpen(false)}
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            Perfil
          </Link>
          <button
            onClick={() => {
              logout();
              setOpen(false);
            }}
            className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            Cerrar sesión
          </button>
        </div>
      )}
    </div>
  );
}
