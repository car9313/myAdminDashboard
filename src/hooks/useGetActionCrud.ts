import { Action } from "@/interfaces/action";
interface UseGetActionCrudProp<T> {
  onView: (row: T, mode?: "view") => void;
  onEdit: (row: T, mode?: "edit") => void;
  onDelete: (row: T) => void;
}

const useGetActionCrud = <T extends object>({
  onView,
  onEdit,
  onDelete,
}: UseGetActionCrudProp<T>) => {
  const crudActions: Action<T>[] = [
    {
      label: "Ver Detalles",
      action: (row: T) => {
        onView(row, "view");
      },
    },
    {
      label: "Editar",
      action: (row: T) => {
        onEdit(row, "edit");
      },
    },
    {
      label: "Delete",
      action: (row: T) => {
        onDelete(row);
      },
    },

    // Puedes agregar más acciones adicionales aquí
  ];
  return {
    crudActions,
  };
};
export default useGetActionCrud;
