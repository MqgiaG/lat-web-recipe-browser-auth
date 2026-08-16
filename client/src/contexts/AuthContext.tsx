import { createContext, useContext, useState } from "react";
import type { CurrentUser } from "../types";

type AuthContextValue = {
  currentUser: CurrentUser | null;
  isAuthenticated: boolean;
  login: (token: string, user: CurrentUser) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextValue>({
  currentUser: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(() => {
    const storedUser = localStorage.getItem("current-user");

    if (!storedUser) {
      return null;
    }

    try {
      return JSON.parse(storedUser) as CurrentUser;
    } catch {
      localStorage.removeItem("current-user");
      return null;
    }
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return Boolean(localStorage.getItem("auth-token"));
  });

  function login(token: string, user: CurrentUser) {
    localStorage.setItem("auth-token", token);
    localStorage.setItem("current-user", JSON.stringify(user));

    setIsAuthenticated(true);
    setCurrentUser(user);
  }

  function logout() {
    localStorage.removeItem("auth-token");
    localStorage.removeItem("current-user");

    setIsAuthenticated(false);
    setCurrentUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}