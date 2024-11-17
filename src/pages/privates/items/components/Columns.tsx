import { Item } from "../models/item";
import { ColumnDef } from "@tanstack/react-table";
import DataActions from "@/components/dataActions/DataActions";
import { Action } from "@/interfaces/action";
import { ColDef } from "../data/dataDef";

interface ItemColumnsProps<Item> {
  actions?: Action<Item>[];
}

export const createItemColumns = ({
  actions,
}: ItemColumnsProps<Item>): ColumnDef<Item>[] => {
  const columns: ColumnDef<Item>[] = [
    {
      id: "name",
      header: "Nombre",
      accessorKey: "name",
    },
    {
      header: ColDef.description,
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
