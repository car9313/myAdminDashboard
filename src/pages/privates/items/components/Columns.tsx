import { Item } from "../models/item";
import { ColumnDef } from "@tanstack/react-table";
import DataActions from "@/components/dataActions/DataActions";
import { Action } from "@/interfaces/action";
import { getDefCardViewKey } from "@/utils/utilities";
import { DefCardViewKeyType } from "@/interfaces/colDef";

interface ItemColumnsProps<Item> {
  actions?: Action<Item>[];
}
const columns: ColumnDef<Item>[] = [
  {
    id: "name",
    header: "Name",
    accessorKey: "name",
  },
  {
    id: "description",
    header: "Description",
    accessorKey: "description",
  },
];

export const createItemColumns = ({
  actions,
}: ItemColumnsProps<Item>): ColumnDef<Item>[] => {
  const columnsEdited: ColumnDef<Item>[] = actions
    ? [
        ...columns,
        {
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
export const defCardViewKey: DefCardViewKeyType[] = getDefCardViewKey(columns);
