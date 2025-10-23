// src/pages/Carrito.jsx
import React from "react";
import { useCart } from "../context/cartContext";
import { useUser } from "../context/userContext";
import { useNavigate } from "react-router-dom";

export default function Carrito() {
  const { cart, removeFromCart, updateQuantity, clearCart, total } = useCart();
  const { isAuthenticated, user, addPurchasedBooks } = useUser();
  const navigate = useNavigate();

  const handlePay = () => {
    if (!isAuthenticated) {
      alert("Debes iniciar sesión para completar tu compra 🧾");
      navigate("/login");
      return;
    }

    // ✅ Guardar los libros comprados en el perfil
    addPurchasedBooks(cart);

    alert(`Compra realizada con éxito, ${user.name}! 🥳`);
    clearCart();
    navigate("/perfil"); // Redirige al perfil
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Tu carrito</h2>
      {cart.length === 0 ? (
        <div className="p-6 bg-white rounded shadow">Tu carrito está vacío.</div>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div key={item.id} className="bg-white p-4 rounded shadow flex items-center gap-4">
              <img src={item.imgLink} alt={item.title} className="w-20 h-28 object-cover rounded" />
              <div className="flex-1">
                <div className="font-semibold">{item.title}</div>
                <div className="text-sm text-gray-600">{item.author}</div>
                <div className="mt-2 flex items-center gap-2">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity || 1}
                    onChange={(e) =>
                      updateQuantity(item.id, Math.max(1, Number(e.target.value)))
                    }
                    className="w-20 p-1 border rounded"
                  />
                  <div className="font-bold">
                    ${(item.price * (item.quantity || 1)).toFixed(2)}
                  </div>
                </div>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Eliminar
              </button>
            </div>
          ))}

          <div className="flex justify-between items-center bg-white p-4 rounded shadow">
            <div>
              <div>Total:</div>
              <div className="text-2xl font-bold">${total.toFixed(2)}</div>
            </div>
            <div className="flex gap-3">
              <button onClick={clearCart} className="px-4 py-2 rounded border">
                Vaciar
              </button>
              <button
                onClick={handlePay}
                className={`px-4 py-2 rounded ${
                  isAuthenticated
                    ? "bg-yellow-300 text-blue-900 hover:bg-yellow-400"
                    : "bg-gray-300 text-gray-600 cursor-not-allowed"
                }`}
              >
                Pagar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
