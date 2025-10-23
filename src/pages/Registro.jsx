import React, { useState } from "react";
import { useUser } from "../context/userContext";
import { useNavigate } from "react-router-dom";

export default function Registro() {
  const { register } = useUser();
  const nav = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const ok = register({ name, email, password });
    if (!ok) return setError("Usuario ya registrado o datos inválidos");
    nav("/login"); // ir a login después de registrarse
  };

  return (
    <div className="max-w-md mx-auto p-6 mt-12 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Registro</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Nombre" className="w-full p-2 border rounded" />
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="w-full p-2 border rounded" />
        <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Contraseña" className="w-full p-2 border rounded" />
        <button className="bg-yellow-300 text-blue-900 px-4 py-2 rounded">Crear cuenta</button>
      </form>
    </div>
  );
}
