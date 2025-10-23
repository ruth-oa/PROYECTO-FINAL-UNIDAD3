// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./componentes/NavBar";
import Footer from "./componentes/Footer";
import Inicio from "./pages/Inicio";
import Catalogo from "./pages/Catalogo";
import DetalleLibro from "./pages/DetalleLibro";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import Carrito from "./pages/Carrito";
import Perfil from "./pages/Perfil";
import { UserProvider } from "./context/userContext";
import { CartProvider } from "./context/cartContext";
import CatalogoCategoria from "./pages/CatalogoCategoria";




export default function App() {
  return (
    <UserProvider>
      <CartProvider>
        <Router>
          <NavBar />
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/catalogo" element={<Catalogo />} />
            <Route path="/catalogo/:categoria" element={<CatalogoCategoria />} />
            <Route path="/detalle/:id" element={<DetalleLibro />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/carrito" element={<Carrito />} />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="*" element={<div className="p-6">Página no encontrada</div>} />
          </Routes>
          <Footer />
        </Router>
      </CartProvider>
    </UserProvider>
  );
}
