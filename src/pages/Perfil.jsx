import React, { useState } from "react";
import { useUser } from "../context/userContext";

export default function Perfil() {
  const { user, logout, updateUser } = useUser();

  const [bio, setBio] = useState(user?.bio || "");
  const [preview, setPreview] = useState(user?.image || "");
  const [editingBio, setEditingBio] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
      updateUser({ image: url });
    }
  };

  const handleBioSave = () => {
    updateUser({ bio });
    setEditingBio(false);
    alert("Biografía actualizada ✅");
  };

  if (!user)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>No hay usuario logueado.</p>
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
        {/* Imagen de usuario */}
        <div className="relative w-32 h-32">
          <img
            src={preview || "https://via.placeholder.com/150"}
            alt="Perfil"
            className="w-32 h-32 rounded-full object-cover border"
          />
          <label className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full cursor-pointer hover:bg-blue-600 transition">
            📷
            <input type="file" onChange={handleImageChange} className="hidden" />
          </label>
        </div>

        {/* Info */}
        <h2 className="text-2xl font-bold mt-4">{user.name}</h2>
        <p className="text-gray-500">{user.email}</p>

        {/* Biografía */}
        <div className="mt-6 w-full max-w-md text-center">
          <h3 className="text-lg font-semibold mb-2">🖋️ Biografía</h3>
          {!editingBio ? (
            <div>
              <p className="text-gray-700 min-h-[60px]">
                {bio || "Aún no has escrito tu biografía."}
              </p>
              <button
                onClick={() => setEditingBio(true)}
                className="mt-2 text-blue-600 hover:underline"
              >
                Editar biografía
              </button>
            </div>
          ) : (
            <div>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Escribe tu biografía..."
                className="w-full p-2 border rounded resize-none"
                rows={4}
              />
              <div className="flex justify-center gap-3 mt-3">
                <button
                  onClick={handleBioSave}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                  Guardar
                </button>
                <button
                  onClick={() => {
                    setBio(user.bio || "");
                    setEditingBio(false);
                  }}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition"
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Libros comprados */}
        <div className="w-full mt-10">
          <h3 className="text-xl font-semibold mb-3">📚 Libros comprados</h3>
          {user.purchased && user.purchased.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {user.purchased.map((book, i) => (
                <div
                  key={i}
                  className="bg-gray-50 p-3 rounded shadow hover:shadow-lg transition"
                >
                  <img
                    src={book.imgLink}
                    alt={book.title}
                    className="w-full h-40 object-cover rounded"
                  />
                  <p className="font-semibold mt-2 text-sm">{book.title}</p>
                  <p className="text-xs text-gray-500">{book.author}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">Aún no has comprado libros.</p>
          )}
        </div>

        {/* Promociones */}
        <div className="w-full mt-10">
          <h3 className="text-xl font-semibold mb-3">🎁 Promociones activas</h3>
          <div className="bg-yellow-50 border border-yellow-200 rounded p-4">
            <p>✨ 10% de descuento en tu próxima compra</p>
            <p>📚 2x1 en libros de Romance hasta fin de mes</p>
          </div>
        </div>

        {/* Cerrar sesión */}
        <button
          onClick={logout}
          className="mt-8 bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition"
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}
