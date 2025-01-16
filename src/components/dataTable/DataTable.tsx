import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";

interface DataTableProps<TData, TValue> {
  data: TData[];
  totalData: number;
  columns: ColumnDef<TData, TValue>[];
  currentPage: number;
  pageSize: number;
  /*   appliedFilters?: TValue;
  dataApi: {
    key: string;
    endPoint: string;
  }; */
}

export function DataTable<TData, TValue>({
  data,
  totalData,
  columns,
  currentPage,
  pageSize,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const totalPages = Math.ceil(totalData / pageSize);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,

      pagination: {
        pageIndex: currentPage - 1, // pageIndex es base 0, pero currentPage es base 1
        pageSize,
      },
    },
    enableRowSelection: true,
    onSortingChange: setSorting,
    manualPagination: true, // Indica que la paginación es controlada manualmente
    pageCount: totalPages, // Total de páginas desde el backend
    getPaginationRowModel: getPaginationRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  return (
    <>
      <div className=" rounded-md border bg-background mt-4 p-4">
        <Table aria-label="Lista de datos">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-red-500"
                >
                  No existen elementos para mostrar
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
