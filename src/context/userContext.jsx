import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("lm_currentUser");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem("lm_currentUser", JSON.stringify(user));
      } else {
        localStorage.removeItem("lm_currentUser");
      }
    } catch {}
  }, [user]);

  const register = ({ name, email, password }) => {
    if (!name || !email || !password) return false;
    try {
      const users = JSON.parse(localStorage.getItem("lm_users")) || [];
      if (users.find(u => u.email === email)) return false;
      const newUser = { name, email, password };
      users.push(newUser);
      localStorage.setItem("lm_users", JSON.stringify(users));
      return true;
    } catch {
      return false;
    }
  };

  const login = ({ email, password }) => {
    try {
      const users = JSON.parse(localStorage.getItem("lm_users")) || [];
      const found = users.find(u => u.email === email && u.password === password);
      if (found) {
        setUser(found);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const logout = () => setUser(null);

  return (
    <UserContext.Provider value={{ user, isAuthenticated: !!user, login, logout, register }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
