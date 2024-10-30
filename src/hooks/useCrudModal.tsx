interface UseCrudModalProps<T> {
  openModalWithItemSelectedAndAction: (item: T, action: string | null) => void;
}
interface UseCrudModalReturn<T> {
  actionsCrud: ActionsCrudProps<T>[];
}
interface ActionsCrudProps<T> {
  label: string;
  action: (row: T) => void;
}
const useCrudModal = <T extends object>({
  openModalWithItemSelectedAndAction,
}: UseCrudModalProps<T>): UseCrudModalReturn<T> => {
  const onDeleteItem = (idItemSelected: T) => {
    console.log("Delete item " + idItemSelected);
  };
  const actionsCrud: ActionsCrudProps<T>[] = [
    {
      label: "Edit",
      action: (row: T) => openModalWithItemSelectedAndAction(row, "Edit"),
    },
    {
      label: "View",
      action: (row: T) => openModalWithItemSelectedAndAction(row, "View"),
    },
    {
      label: "Delete",
      action: (row: T) => onDeleteItem(row),
    },
  ];
  return {
    actionsCrud,
  };
};

export default useCrudModal;
