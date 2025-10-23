import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useUser } from "../context/userContext";

export default function Login() {
  const { login } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const nav = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const ok = login({ email, password });
    if (!ok) return setError("Email o contraseña incorrectos");
    nav("/"); // ir a inicio si login correcto
  };

  return (
    <div className="max-w-md mx-auto p-6 mt-12 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Iniciar sesión</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-2 border rounded"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
          type="password"
          className="w-full p-2 border rounded"
        />
        <div className="flex items-center justify-between">
          <button className="bg-blue-700 text-white px-4 py-2 rounded">Entrar</button>
          <Link to="/registro" className="text-sm underline">
            ¿No tienes cuenta?
          </Link>
        </div>
      </form>
    </div>
  );
}
