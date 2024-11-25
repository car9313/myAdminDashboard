import { ColumnDef } from "@tanstack/react-table";
/* import DataActions from "@/components/dataActions/DataActions";
import { Action } from "@/interfaces/action";
import { DefinitionCol } from "@/interfaces/DefinitionCol";
 */ import { DefCardViewKeyType } from "@/interfaces/colDef";

interface ItemColumnsProps /* <T> */ {
  /*   actions?: Action<T>[];
   */ colDef: DefCardViewKeyType[];
}
export const getColumnsGeneric = <T,>(
  {
    /*   actions, */
    colDef,
  }: ItemColumnsProps /* <T> */
): ColumnDef<T>[] => {
  return colDef.map((col) => {
    return { header: col.header, accessorKey: col.value };
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
      ];
  return columnsEdited;
 */
};
