import React, { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import RequestController from "../utils/request-controller";
import APIRoutes from "../constants/api_routes";
import { Alert } from "react-native";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { setUser } from "../redux/slices/user";
import useApi from "./api";
import BaseKeys from "../constants/base_keys";

interface AuthContextType {
  token: string | null;
  isTokenLoading: boolean;
  isAuthenticated: boolean;
  register: (values: { username: string; password: string }) => Promise<void>;
  login: (values: { username: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext: React.Context<AuthContextType> =
  createContext<AuthContextType>({
    token: null,
    isTokenLoading: true,
    isAuthenticated: false,
    register: async () => null,
    login: async () => null,
    logout: async () => null,
  });

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [isTokenLoading, setIsTokenLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const { getUser } = useApi();
  const dispatch = useAppDispatch();

  const loadSession = async () => {
    try {
      const storedToken = await SecureStore.getItemAsync(BaseKeys.AUTH_TOKEN);
      const storedUser = await SecureStore.getItemAsync(BaseKeys.USER);

      RequestController.setToken(storedToken);

      if (storedToken) {
        setToken(storedToken);
        setIsAuthenticated(true);
        if (!storedUser) {
          getUser();
        } else {
          dispatch(setUser(JSON.parse(storedUser)));
          getUser();
        }
      } else {
        setToken(null);

        setIsAuthenticated(false);
      }
    } catch (error) {
      setIsAuthenticated(false);
      console.error("Error loading session:", error);
    } finally {
      setIsTokenLoading(false);
    }
  };
  useEffect(() => {
    loadSession();
  }, []);

  const register = async (values: { username: string; password: string }) => {
    try {
      const response = await fetch("https://yourapi.com/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const data = await response.json();

      if (data.token) {
        await SecureStore.setItemAsync(BaseKeys.AUTH_TOKEN, data.token);

        await loadSession();
        // setToken(data.token);
        // setUser(data.user);
      }
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  const login = async (values: { username: string; password: string }) => {
    try {
      console.log("values going:", values);
      const response: any = await RequestController.post(
        APIRoutes.login,
        values
      );

      console.log("response", response, "\n", token);

      if (response?.data?.refreshToken) {
        await SecureStore.setItemAsync(
          BaseKeys.AUTH_TOKEN,
          response.data.refreshToken
        );
        await loadSession();
        Alert.alert(
          "Success",
          `Login Successful.\nWelcome back ${response.data.firstName}!`
        );
        // setToken(response.data.refreshToken);
        // setUser(response.user);
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const logout = async () => {
    try {
      // Remove token from SecureStore
      await SecureStore.deleteItemAsync(BaseKeys.AUTH_TOKEN);
      await loadSession();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
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
