import useCanPerformAction from "./useCanPerformAction";
import { checkPermissions, createAction } from "@/utils/utilities";
import { ActionsList } from "@/interfaces/actionsList";
import { ActionDef } from "@/interfaces/actionDef";
import { ModalMode } from "@/interfaces/modalMode";
import { useAuth } from "@/context/authContext";

interface UseGetActionCrudProp<T> {
  onView: ({ mode, item }: { mode: ModalMode; item: T }) => void;
  onEdit: ({ mode, item }: { mode: ModalMode; item: T }) => void;
  onDelete: (row: T) => void;
  resource: string;
  actionsList: ActionsList;
  additionalActions?: {
    // Acciones adicionales pasadas como un array de objetos
    label: string;
    action: (row: T) => void;
    permissions: string[]; // Permisos necesarios para cada acción
  }[];
}

const useGetActionCrud = <T>({
  onView,
  onEdit,
  onDelete,
  resource,
  actionsList,
  additionalActions = [], // Array vacío por defecto
}: UseGetActionCrudProp<T>) => {
  const { userState } = useAuth();
  const user = userState?.user;

  const canView = checkPermissions({
    user,
    resource,
    actions: actionsList.read.actions,
  }).hasAll;

  const canEdit = checkPermissions({
    user,
    resource,
    actions: actionsList.update.actions,
  }).hasAll;
  const canDelete = checkPermissions({
    user,
    resource,
    actions: actionsList.delete.actions,
  }).hasAll;

  // Verificar permisos para las acciones adicionales
  const availableAdditionalActions = additionalActions.map((action) => ({
    ...action,
    canPerform: checkPermissions({
      user,
      resource,
      actions: action.permissions,
    }).hasAll, // Verificar permisos de forma explícita
  }));

  const availableActions: ActionDef<T>[] = [
    createAction<T>(
      "Ver Detalles",
      (item) => onView({ mode: "view", item }),
      canView,
      "view"
    ),
    createAction<T>(
      "Editar",
      (item) => onEdit({ mode: "edit", item }),
      canEdit,
      "edit"
    ),
    createAction<T>("Eliminar", (row) => onDelete(row), canDelete, "delete"),
    ...availableAdditionalActions
      .filter((action) => action.canPerform) // Solo incluye acciones con permisos
      .map((action) => ({
        label: action.label,
        action: action.action,
        key: `additional-${action.label}`, // Clave única para acciones adicionales
      })),
  ].filter((action): action is ActionDef<T> => !!action); // Filtrar si hay alguna acción vacía
  return {
    listActions: availableActions,
  };
};
export default useGetActionCrud;
