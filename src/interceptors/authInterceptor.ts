import { axiosInstance } from '@/lib/axios'
import useAuth from '../hooks/useAuth'
import { getAccessRefreshToken } from '@/services/auth'

// Axios Interceptor
export const AxiosInterceptor = () => {
  console.log('Hola Mundo')
  const { state, refreshAccessTokenState, deleteSession } = useAuth()
  // Este interceptor se encarga de añadir el token a cada solicitud
  axiosInstance.interceptors.request.use(
    (config) => {
      const accessToken = state.accessToken
      if (accessToken && config.headers) {
        config.headers.Authorization = `Bearer ${accessToken}`
      }
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  // Este interceptor maneja la respuesta de error cuando el token ha expirado
  axiosInstance.interceptors.response.use(
    (response) => {
      return response
    },
    async (error) => {
      //const originalRequest: CustomAxiosRequestConfig | undefined = error.config;
      const originalRequest = error.config
      // Si recibimos un error 401, intentamos refrescar el token
      if (
        error.response?.status === 401 &&
        originalRequest &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true // Prevenir múltiples intentos
        try {
          const refreshAccessToken = state.refreshAccessToken
          if (!refreshAccessToken)
            return Promise.reject(
              'Refress Token Nulo.No se pude refrescar el token'
            )
          const newAccessToken = await getAccessRefreshToken(refreshAccessToken)
          refreshAccessTokenState(newAccessToken)
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
          return axiosInstance(originalRequest)
        } catch (err) {
          // Si no se pudo refrescar el token, cerramos la sesión
          deleteSession()
          return Promise.reject(err)
        }
      }
      // Si es cualquier otro error, lo devolvemos
      return Promise.reject(error)
    }
  )
  /*  return axiosInstance */
}
