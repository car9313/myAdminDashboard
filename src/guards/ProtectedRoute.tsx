// ProtectedRoute.tsx
import { useAuth } from "@/context/authContext";

import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRouteProps {
  requiredResource: string;
  requiredAction: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  requiredResource,
  requiredAction,
}) => {
  const { userState, hasPermission } = useAuth();
  console.log(userState);
  const hasAccess = userState
    ? hasPermission(userState.user.roles, requiredResource, requiredAction)
    : false;

  return !userState || !hasAccess ? <Navigate to="/login" /> : <Outlet />;
};

export default ProtectedRoute;
