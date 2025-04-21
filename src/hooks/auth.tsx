import React, { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";

interface AuthContextType {
  user: object | null;
  token: string | null;
  isTokenLoading: boolean;
  isAuthenticated: boolean;
  register: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext: React.Context<AuthContextType> =
  createContext<AuthContextType>({
    user: null,
    token: null,
    isTokenLoading: true,
    isAuthenticated: false,
    register: async () => null,
    login: async () => null,
    logout: async () => null,
  });

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<object | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isTokenLoading, setIsTokenLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  // Load the token from SecureStore when the app starts
  useEffect(() => {
    const loadSession = async () => {
      try {
        const storedToken = await SecureStore.getItemAsync("auth_token");
        if (storedToken) {
          setToken(storedToken);
          setIsAuthenticated(true);
        }
      } catch (error) {
        setIsAuthenticated(false);
        console.error("Error isTokenLoading session:", error);
      } finally {
        setIsTokenLoading(false);
      }
    };

    loadSession();
  }, []);

  const register = async (email: string, password: string) => {
    try {
      // Call your API endpoint for registration
      const response = await fetch("https://yourapi.com/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (data.token) {
        // Store the token securely
        await SecureStore.setItemAsync("auth_token", data.token);
        setToken(data.token);
        setUser(data.user); // Store user info after successful registration
      }
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };
  // Login function (Authenticate user)
  const login = async (email: string, password: string) => {
    try {
      // Call your API endpoint for login
      const response = await fetch("https://yourapi.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (data.token) {
        // Store the token securely
        await SecureStore.setItemAsync("auth_token", data.token);
        setToken(data.token);
        setUser(data.user); // Store user info after successful login
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      // Remove token from SecureStore
      await SecureStore.deleteItemAsync("auth_token");
      setToken(null);
      setUser(null); // Clear user data
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isTokenLoading,
        isAuthenticated,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext<AuthContextType>(AuthContext);
