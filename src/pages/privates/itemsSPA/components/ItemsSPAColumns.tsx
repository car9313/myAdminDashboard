import { ColumnDef } from "@tanstack/react-table";
import DataActions from "@/components/dataActions/DataActions";
import { Action } from "@/interfaces/action";

interface ItemColumnsProps<T> {
  actions?: Action<T>[];
}

export const createItemColumns = <T,>({
  actions,
}: ItemColumnsProps<T>): ColumnDef<T>[] => {
  const columns: ColumnDef<T>[] = [
    {
      id: "name",
      header: "Nombre",
      accessorKey: "name",
    },
    {
      id: "description",
      header: "Descripcion",
      accessorKey: "description",
    },
  ];
  const columnsEdited: ColumnDef<T>[] = actions
    ? [
        ...columns,
        {
          id: "actions",
          header: "Acciones",
          enableHiding: false,
          cell: ({ row }) => (
            <DataActions itemSelected={row.original} actions={actions} />
          ),
          size: 50,
        },
      ]
    : columns;
  return columnsEdited;
};
