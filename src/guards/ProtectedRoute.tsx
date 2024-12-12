// ProtectedRoute.tsx
import { useAuth } from "@/context/authContext";
import UnauthorisedError from "@/pages/errors/unauthorised-error";
import { checkPermissions } from "@/utils/utilities";
import { ReactNode } from "react";
import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRouteProps {
  requiredResource: string;
  requiredAction: string[];
  children?: ReactNode;
}
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  requiredResource,
  requiredAction,
  children,
}) => {
  const { userState, isLoaded } = useAuth();
  const user = userState?.user;
  if (!isLoaded) {
    return null; // No renderiza hasta que los datos se carguen
  }

  // Verificación de permisos solo después de que el estado esté cargado

  const hasAccess = checkPermissions({
    user,
    resource: requiredResource,
    actions: requiredAction,
  }).hasAll;
  // Renderiza la ruta protegida o el error de autorización
  if (!userState) {
    return <Navigate to="/login" />;
  } else if (!hasAccess) {
    return <UnauthorisedError />;
  }

  return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute;
