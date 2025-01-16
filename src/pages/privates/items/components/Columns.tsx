import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Item } from "../models/item";
import { DataTableColumnHeader } from "@/components/dataTable/DataTableColumnHeader";
import { ActionDef } from "@/interfaces/actionDef";
import DataActions from "@/components/dataActions/DataActions";

export const getColumns = ({
  listActions,
}: {
  listActions: ActionDef<Item>[];
}): ColumnDef<Item>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: (info) => info.getValue(),
    enableSorting: true,
  },

  {
    id: "actions",
    header: "Acciones",
    enableHiding: false,
    cell: ({ row }) => (
      <DataActions itemSelected={row.original} actions={listActions} />
    ),
    size: 50,
  },
];

export const columnsItems: ColumnDef<Item>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: (info) => info.getValue(),
    enableSorting: true,
  },

  /*  {
    id: "actions",
    header: "Acciones",
    enableHiding: false,
    cell: ({ row }) => (
      <DataActions itemSelected={row.original} actions={actions} />
    ),
    size: 50,
  }, */
];
