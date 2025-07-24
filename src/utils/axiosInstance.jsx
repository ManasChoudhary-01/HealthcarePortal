// import axios from "axios";

// const instance = axios.create({
//   baseURL: "http://localhost:5000/api", // change to your backend URL
//   withCredentials: true, // needed for cookies (optional)
// });

// export default instance;

// setupAxiosInterceptors.js
import axios from 'axios';
import useAuthStore from '../context/AuthContext';

const setupAxiosInterceptors = () => {
  const { accessToken, refreshToken, login, logout } = useAuthStore.getState();

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
      if (
        error.response?.status === 401 &&
        !originalRequest._retry &&
        refreshToken
      ) {
        originalRequest._retry = true;
        try {
          const res = await axios.post('/auth/refresh', { refreshToken });
          login({
            accessToken: res.data.accessToken,
            refreshToken: refreshToken,
            role: get().role,
          });
          originalRequest.headers.Authorization = `Bearer ${res.data.accessToken}`;
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
};

export default setupAxiosInterceptors;

