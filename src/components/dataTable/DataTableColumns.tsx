import { ColumnDef } from "@tanstack/react-table";
import DataActions from "@/components/dataActions/DataActions";

import { DefCardViewKeyType } from "@/interfaces/colDef";
import { ActionDef } from "@/interfaces/actionDef";

interface ItemColumnsProps<T> {
  actions?: ActionDef<T>[];
  colDef: DefCardViewKeyType[];
}
export const getColumnsGeneric = <T,>({
  actions,
  colDef,
}: ItemColumnsProps<T>): ColumnDef<T>[] => {
  const columnsMapped = colDef.map((col) => {
    return { id: col.id, header: col.header, accessorKey: col.value };
  });
  const columnsEdited: ColumnDef<T>[] = !actions
    ? columnsMapped
    : [
        ...columnsMapped,
        {
          header: "Acciones",
          accessorKey: "acciones",
          enableHiding: false,
          cell: ({ row }) => (
            <DataActions itemSelected={row.original} actions={actions} />
          ),
          size: 50,
        },
      ];
  return columnsEdited;
};
