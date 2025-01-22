import { ActionDef } from "@/interfaces/actionDef";
import { useAuth } from "@/context/authContext";
import { checkPermissions } from "@/utils/permissions";
import { useCallback, useMemo } from "react";

interface UseGetActionCrudProp<T> {
  resource: string;
  actions?: ActionDef<T>[];
}

const useGetActionsWithPermissions = <T>({
  resource,
  actions = [], // Array vacío por defecto
}: UseGetActionCrudProp<T>): {
  listActions: ActionDef<T>[] | undefined;
  hasPermission: (actions: string[]) => boolean;
} => {
  const { userState } = useAuth();
  const user = userState?.user;

  const hasPermission = useCallback(
    (actions: string[]) => checkPermissions({ user, resource, actions }).hasAll,
    [user, resource]
  );

  const listActions: ActionDef<T>[] =
    actions &&
    useMemo(() => {
      return actions.filter(
        (action) =>
          checkPermissions({
            user,
            resource,
            actions: action.permissions,
          }).hasAll
      );
    }, [user, resource, actions]);
  return { listActions, hasPermission };
};
export default useGetActionsWithPermissions;
