// src/context/cartContext.jsx
import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("lm_cart");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("lm_cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (book) => {
    setCart((prev) => {
      const exists = prev.find((b) => b.id === book.id);
      if (exists) {
        return prev.map((b) => (b.id === book.id ? { ...b, quantity: b.quantity + 1 } : b));
      }
      return [...prev, { ...book, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => setCart((prev) => prev.filter((b) => b.id !== id));

  const updateQuantity = (id, qty) =>
    setCart((prev) => prev.map((b) => (b.id === id ? { ...b, quantity: qty } : b)));

  const clearCart = () => setCart([]);

  const total = cart.reduce((sum, b) => sum + b.price * (b.quantity || 1), 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, total }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
