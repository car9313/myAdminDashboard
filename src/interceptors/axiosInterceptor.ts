import { axiosInstance } from "@/lib/axios";
import { isTokenExpired } from "@/utils/utilities";

// Configurar el interceptor de Axios
const setupAxiosInterceptors = (
  refreshToken: () => Promise<void>,
  logout: () => void
) => {
  // Interceptor de solicitudes
  axiosInstance.interceptors.request.use((config) => {
    const token = sessionStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
  // Interceptor de respuestas
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      console.log("Interceptor de respuestas");
      const originalRequest = error.config;
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const token = sessionStorage.getItem("accessToken");
        // Si el token ha expirado, intenta renovarlo
        try {
          if (token && isTokenExpired(token)) {
            await refreshToken();
            const newToken = sessionStorage.getItem("accessToken");
            if (newToken) {
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
              return axiosInstance(originalRequest); // Reintenta
            }
          }
        } catch (refreshError) {
          console.error("No se pudo renovar el token", refreshError);
          logout(); // Cierra sesión
        }

        return Promise.reject(error);
      }
    }
  );
};
export { axiosInstance, setupAxiosInterceptors };
