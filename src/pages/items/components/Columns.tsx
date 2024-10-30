import { Item } from "../models/item";
import { ColumnDef } from "@tanstack/react-table";
import { Action } from "@/interfaces/action";
import DataActions from "@/components/dataActions/DataActions";

interface ItemColumnsProps<Item> {
  actions?: Action<Item>[];
}

export const createItemColumns = ({
  actions,
}: ItemColumnsProps<Item>): ColumnDef<Item>[] => {
  const columns: ColumnDef<Item>[] = [
    {
      header: "Name",
      accessorKey: "name",
    },
    {
      header: "Description",
      accessorKey: "description",
    },
  ];
  const columnsEdited: ColumnDef<Item>[] = actions
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
