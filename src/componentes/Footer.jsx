// src/componentes/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-blue-900 text-white mt-12">
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-4 gap-6">
        <div>
          <h4 className="font-bold text-yellow-300">LibroMundo</h4>
          <p className="text-sm mt-2">Tu librería online. Envíos a todo el país.</p>
        </div>
        <div>
          <h5 className="font-semibold">Información</h5>
          <ul className="mt-2 text-sm space-y-1">
            <li><Link to="/politicas" className="hover:underline">Política de Privacidad</Link></li>
            <li><Link to="/terminos" className="hover:underline">Términos</Link></li>
          </ul>
        </div>
        <div>
          <h5 className="font-semibold">Ayuda</h5>
          <ul className="mt-2 text-sm space-y-1">
            <li><Link to="/faq" className="hover:underline">FAQ</Link></li>
            <li><Link to="/contacto" className="hover:underline">Contacto</Link></li>
          </ul>
        </div>
        <div>
          <h5 className="font-semibold">Métodos de pago</h5>
          <p className="mt-2 text-sm">Visa · Mastercard · PayPal</p>
        </div>
      </div>
      <div className="text-center py-4 border-t border-blue-800 text-sm">© {new Date().getFullYear()} LibroMundo</div>
    </footer>
  );
}
