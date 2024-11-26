import { axiosInstance } from "@/lib/axios";
import { isTokenExpired } from "@/utils/utilities";

// Interfaz para decodificar el token y obtener el tiempo de expiración
interface DecodedToken {
  exp: number;
}

// Configurar el interceptor de Axios
const setupAxiosInterceptors = (
  refreshToken: () => Promise<void>,
  logout: () => void
) => {
  // Interceptor de solicitudes
  console.log("Interseptor");
  axiosInstance.interceptors.request.use(
    (config) => {
      console.log("Interceptor de solicitudes");
      const token = localStorage.getItem("accessToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      console.log("Interseptor");
      console.log("Interceptor de respuestas");

      if (error.response?.status === 401) {
        /*  const token = localStorage.getItem("accessToken");
        // Si el token ha expirado, intenta renovarlo
        if (token && isTokenExpired(token)) {
          try {
            await refreshToken();
          } catch (refreshError) {
            logout();
            return Promise.reject(refreshError);
          }
        } else {
          logout();
        } */
        logout();
      }
      return Promise.reject(error);
    }
  );
};
export { axiosInstance, setupAxiosInterceptors };
