// ProtectedRoute.tsx
import { useAuth } from "@/context/authContext";
import React, { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

interface ProtectedRouteProps {
  requiredResource: string;
  requiredAction: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  requiredResource,
  requiredAction,
}) => {
  const { userState, hasPermission, isLoaded } = useAuth();
  const location = useLocation();
  console.log(isLoaded);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }
  const hasAccess = userState?.user
    ? hasPermission(userState?.user.roles, requiredResource, requiredAction)
    : false;
  if (!hasAccess || !userState) {
    // Guardar la ruta actual en el almacenamiento local
    localStorage.setItem("redirectAfterLogin", location.pathname);
  }
  return !userState || !hasAccess ? <Navigate to="/login" /> : <Outlet />;
};

export default ProtectedRoute;
