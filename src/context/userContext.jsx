import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  // 🔹 Estado del usuario actual
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("lm_currentUser");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  // 🔹 Guardar / limpiar usuario en localStorage
  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem("lm_currentUser", JSON.stringify(user));
      } else {
        localStorage.removeItem("lm_currentUser");
      }
    } catch {}
  }, [user]);

  // ✅ Registrar un nuevo usuario
  const register = ({ name, email, password }) => {
    if (!name || !email || !password) return false;
    try {
      const users = JSON.parse(localStorage.getItem("lm_users")) || [];
      if (users.find((u) => u.email === email)) return false;
      const newUser = {
        name,
        email,
        password,
        image: "",
        bio: "",
        purchased: [],
      };
      users.push(newUser);
      localStorage.setItem("lm_users", JSON.stringify(users));
      return true;
    } catch {
      return false;
    }
  };

  // ✅ Iniciar sesión
  const login = ({ email, password }) => {
    try {
      const users = JSON.parse(localStorage.getItem("lm_users")) || [];
      const found = users.find(
        (u) => u.email === email && u.password === password
      );
      if (found) {
        setUser(found);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  // ✅ Cerrar sesión
  const logout = () => setUser(null);

  // ✅ Actualizar datos del usuario actual (bio, imagen, etc.)
  const updateUser = (updates) => {
    setUser((prev) => {
      const updatedUser = { ...prev, ...updates };

      // También actualiza el registro en la lista global de usuarios
      try {
        const users = JSON.parse(localStorage.getItem("lm_users")) || [];
        const index = users.findIndex((u) => u.email === prev.email);
        if (index !== -1) {
          users[index] = updatedUser;
          localStorage.setItem("lm_users", JSON.stringify(users));
        }
      } catch {}

      return updatedUser;
    });
  };

  // ✅ Agregar libros comprados al perfil
  const addPurchasedBooks = (books) => {
    setUser((prev) => {
      const updated = {
        ...prev,
        purchased: [...(prev?.purchased || []), ...books],
      };

      // Actualizar también en la lista global
      try {
        const users = JSON.parse(localStorage.getItem("lm_users")) || [];
        const index = users.findIndex((u) => u.email === prev.email);
        if (index !== -1) {
          users[index] = updated;
          localStorage.setItem("lm_users", JSON.stringify(users));
        }
      } catch {}

      return updated;
    });
  };

  // ✅ Eliminar un libro comprado
  const removePurchasedBook = (bookId) => {
    setUser((prev) => {
      const updated = {
        ...prev,
        purchased: (prev?.purchased || []).filter((b) => b.id !== bookId),
      };

      try {
        const users = JSON.parse(localStorage.getItem("lm_users")) || [];
        const index = users.findIndex((u) => u.email === prev.email);
        if (index !== -1) {
          users[index] = updated;
          localStorage.setItem("lm_users", JSON.stringify(users));
        }
      } catch {}

      return updated;
    });
  };

  return (
    <UserContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        register,
        login,
        logout,
        updateUser,
        addPurchasedBooks,
        removePurchasedBook,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

// Hook personalizado
export const useUser = () => useContext(UserContext);
