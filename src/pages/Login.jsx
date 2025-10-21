// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useUser } from "../context/userContext";

export default function Login() {
  const { login } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // demo: no real auth. En producción conectar a API.
    login({ name: email.split("@")[0], email });
    nav("/");
  };

  return (
    <div className="max-w-md mx-auto p-6 mt-12 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Iniciar sesión</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email" className="w-full p-2 border rounded" />
        <input value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Contraseña" type="password" className="w-full p-2 border rounded" />
        <div className="flex items-center justify-between">
          <button className="bg-blue-700 text-white px-4 py-2 rounded">Entrar</button>
          <Link to="/registro" className="text-sm underline">¿No tienes cuenta?</Link>
        </div>
      </form>
    </div>
  );
}
