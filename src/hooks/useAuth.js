import { useState, useEffect, useCallback, createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api, { setAuthToken, login as apiLogin, register as apiRegister, fetchCurrentUser } from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const login = useCallback(
    async (email, password) => {
      try {
        const { token, user } = await apiLogin(email, password);
        localStorage.setItem("token", token);
        setAuthToken(token);
        setUser(user);
        navigate("/");
      } catch (error) {
        console.error("Login failed:", error);
        throw error;
      }
    },
    [navigate]
  );

  const signup = useCallback(
    async (username, email, password) => {
      try {
        const { token, user } = await apiRegister(username, email, password);
        localStorage.setItem("token", token);
        setAuthToken(token);
        setUser(user);
        navigate("/");
      } catch (error) {
        console.error("Signup failed:", error);
        throw error;
      }
    },
    [navigate]
  );

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setAuthToken(null);
    setUser(null);
    navigate("/login");
  }, [navigate]);

  const checkAuth = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuthToken(token);
      try {
        const user = await fetchCurrentUser();
        setUser(user);
      } catch (error) {
        console.error("Auth check failed:", error);
        localStorage.removeItem("token");
        setAuthToken(null);
      }
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
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

export default useAuth;