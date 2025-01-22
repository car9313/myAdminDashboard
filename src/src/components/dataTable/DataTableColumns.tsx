import { ColumnDef } from "@tanstack/react-table";
import DataActions from "@/components/dataActions/DataActions";

import { DefCardViewKeyType } from "@/interfaces/colDef";
import { ActionDef } from "@/interfaces/actionDef";
import { DataTableColumnHeader } from "./DataTableColumnHeader";

interface ItemColumnsProps<T> {
  actions?: ActionDef<T>[];
  colDef: DefCardViewKeyType[];
}
export const getColumnsGeneric = <T,>({
  actions,
  colDef,
}: ItemColumnsProps<T>): ColumnDef<T>[] => {
  const columns: ColumnDef<T>[] = [];
  colDef.map((col) => {
    columns.push({
      id: col.id,
      meta: col.title,
      accessorKey: col.id,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={col.title} />
      ),
      cell: ({ row }) => {
        row.getValue(col.id);
      },
      enableSorting: col.enableSorting,
    });
  });
  actions &&
    columns.push({
      header: "Acciones",
      accessorKey: "acciones",
      enableHiding: false,
      cell: ({ row }) => (
        <DataActions itemSelected={row.original} actions={actions} />
      ),
      size: 50,
    });
  /* const columnsEdited: ColumnDef<T>[] = !actions
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
      ]; */
  return columns;
};
