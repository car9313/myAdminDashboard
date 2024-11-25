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
  axiosInstance.interceptors.request.use((config) => {
    console.log("Interceptor de solicitudes");
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
  /*   axiosInstance.interceptors.request.use(async (config) => {
    const token = localStorage.getItem("accessToken");
    if (token && isTokenExpired(token)) {
      // Si el token ha expirado, intenta renovarlo
      try {
        await refreshToken();
        config.headers["Authorization"] = `Bearer
${localStorage.getItem("accessToken")}`;
      } catch (error) {
        logout(); // Si la renovación falla, cerrar sesión
      }
    } else if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
 */ // Interceptor de respuestas
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      console.log("Interceptor de respuestas");
      if (error.response?.status === 401) {
        const token = localStorage.getItem("accessToken");
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
        }
      }
      return Promise.reject(error);
    }
  );
};
export { axiosInstance, setupAxiosInterceptors };
