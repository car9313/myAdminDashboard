import { useAuth } from "@/context/authContext";
import { checkPermissions } from "@/utils/utilities";
import { useMemo } from "react";

interface UseCanPerformActionProps {
  resource: string;
  actions: string[];
}

const useCanPerformAction = ({
  resource,
  actions,
}: UseCanPerformActionProps): boolean => {
  const { userState } = useAuth();

  // Memoización de la verificación de permisos para evitar cálculos innecesarios
  const hasPermissions = useMemo(() => {
    if (userState?.user && userState?.user.roles) {
      return checkPermissions(userState.user.roles, resource, actions).hasAll;
    }
    return false;
  }, [userState, resource, actions]);

  return hasPermissions;
};

export default useCanPerformAction;
