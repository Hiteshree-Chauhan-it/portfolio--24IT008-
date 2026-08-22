import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { registerUser as apiRegister, loginUser as apiLogin, fetchMe } from "../api/apiClient";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // In-Memory Authentication State
  // Storing token in React state (memory) insulates it from XSS token theft
  // compared to storing in localStorage.
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState(null);

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    setAuthError(null);
  }, []);

  const handleUnauthorized = useCallback(() => {
    logout();
  }, [logout]);

  const login = async (email, password) => {
    setLoading(true);
    setAuthError(null);
    try {
      const data = await apiLogin(email, password);
      setToken(data.token);
      setUser(data.user);
      setLoading(false);
      return { success: true };
    } catch (err) {
      setAuthError(err.message);
      setLoading(false);
      return { success: false, message: err.message };
    }
  };

  const register = async (email, password) => {
    setLoading(true);
    setAuthError(null);
    try {
      const data = await apiRegister(email, password);
      setToken(data.token);
      setUser(data.user);
      setLoading(false);
      return { success: true };
    } catch (err) {
      setAuthError(err.message);
      setLoading(false);
      return { success: false, message: err.message };
    }
  };

  const value = {
    token,
    user,
    isAuthenticated: Boolean(token),
    loading,
    authError,
    login,
    register,
    logout,
    handleUnauthorized,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
