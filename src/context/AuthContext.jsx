import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "../utils/axiosInstance";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [role, setRole] = useState(null);

  const login = ({ accessToken, refreshToken, role }) => {
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
    setRole(role);
  };

  const logout = () => {
    setAccessToken(null);
    setRefreshToken(null);
    setRole(null);
  };

  useEffect(() => {
    const requestInterceptor = axios.interceptors.request.use((config) => {
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    });

    const responseInterceptor = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry && refreshToken) {
          originalRequest._retry = true;
          try {
            const res = await axios.post("/auth/refresh", { refreshToken });
            setAccessToken(res.data.accessToken);
            originalRequest.headers["Authorization"] = `Bearer ${res.data.accessToken}`;
            return axios(originalRequest);
          } catch (err) {
            logout();
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, [accessToken, refreshToken]);

  return (
    <AuthContext.Provider value={{ accessToken, refreshToken, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
