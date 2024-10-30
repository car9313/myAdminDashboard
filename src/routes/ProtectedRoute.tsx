/* ProtectedRoute será responsable de redirigir al usuario a la página de Login si no
está autenticado. */

import { routeInfo } from '@/data/routeInfo'
import useAuth from '@/hooks/useAuth'

import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = () => {
  console.log('Protected Route')

  const { isAuthenticated } = useAuth()
  return isAuthenticated() ? (
    <Outlet />
  ) : (
    <Navigate to={routeInfo.SIGNIN.path} />
  )
}
export default ProtectedRoute
