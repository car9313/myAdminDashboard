import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/dataTable/DataTableColumnHeader";
import { Solicitud } from "../models/requests";
import { Checkbox } from "@/components/ui/checkbox";

export const columns: ColumnDef<Solicitud>[] = [
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
    accessorKey: "cantidad",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Cantidad" />
    ),
    cell: (info) => info.getValue(),
    enableSorting: true,
  },
  {
    accessorKey: "status_solicitud",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Estado" />
    ),
    cell: (info) => info.getValue(),
    enableSorting: true,
  },
  {
    accessorKey: "fecha_solicitud",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Fecha Solicitud" />
    ),
    cell: (info) => info.getValue(),
    enableSorting: true,
  },
];

/* 
export const getColumns = ({
  listActions,
}: {
  listActions: ActionDef<Solicitud>[];
}): ColumnDef<Solicitud>[] => [
  {
    accessorKey: "cantidad",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Cantidad" />
    ),
    cell: (info) => info.getValue(),
    enableSorting: true,
  },
  {
    accessorKey: "status_solicitud",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Estado" />
    ),
    cell: (info) => info.getValue(),
    enableSorting: true,
  },
  {
    accessorKey: "fecha_solicitud",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Fecha Solicitud" />
    ),
    cell: (info) => info.getValue(),
    enableSorting: true,
  },
 */
/*   {
    id: "actions",
    header: "Acciones",
    enableHiding: false,
    cell: ({ row }) => (
      <DataActions itemSelected={row.original} actions={listActions} />
    ),
    size: 50,
  }, 
];
*/
