import ListCardView from "@/components/CardView/ListCardView";
import { DataTable } from "@/components/dataTable/DataTable";
import RowsPerPage from "@/components/FooterListItems/RowsPerPage";
import Pagination from "@/components/Pagination";
import DataTableSkeleton from "@/components/skeletons/DataTableSkeleton";
import { useEffect, useMemo, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { ActionDef } from "@/interfaces/actionDef";
import UseGetAllFromApi from "@/hooks/useGetAllFromApi";
import { DefCardViewKeyType } from "@/interfaces/colDef";
import { getColumnsGeneric } from "@/components/dataTable/DataTableColumns";
import { ViewModeCrudType } from "@/interfaces/viewModeCrudType";
import ViewToggle from "../viewToggle/ViewToggle";
import useViewModeCrud from "@/hooks/crud/useViewModeCrud";

const AllViewItems = <TData, TFilter>({
  appliedFilters,
  columns,
  listActions,
  colDef,
  viewModeCrud,
}: {
  appliedFilters?: TFilter;
  columns?: ColumnDef<TData>[];
  listActions: ActionDef<TData>[];
  colDef: DefCardViewKeyType[];
  viewModeCrud?: ViewModeCrudType;
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const { data, isLoading } = UseGetAllFromApi<TData, TFilter>({
    key: "items",
    endPoint: "/items",
    appliedFilters,
    page: currentPage,
    pageSize,
  });
  const { currentView, handleViewChange } = useViewModeCrud({
    viewModeCrud: !viewModeCrud ? "table" : viewModeCrud,
  });

  const columnsTable = columns
    ? columns
    : useMemo(
        () => getColumnsGeneric<TData>({ actions: listActions, colDef }),
        [colDef, listActions]
      );
  useEffect(() => {
    setCurrentPage(1);
  }, [appliedFilters]);

  const { objects, total } = { ...data };

  // Manejador para el cambio de tamaño de página
  const handlePageSizeChange = (value: number) => {
    setPageSize(value);
    setCurrentPage(1); // Reinicia a la primera página
  };
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };
  return (
    <>
      <div className="flex gap-2 flex-1 items-center justify-end">
        {viewModeCrud === "optional" && (
          <ViewToggle onViewChange={handleViewChange} />
        )}
      </div>
      {isLoading ? (
        <DataTableSkeleton />
      ) : !currentView ? (
        <DataTable
          data={objects || []}
          columns={columnsTable}
          currentPage={currentPage}
          total={total || 0}
          pageSize={pageSize}
        />
      ) : (
        <ListCardView<TData>
          data={objects || []}
          columnsDef={colDef}
          className={"hover:shadow-md"}
          actions={listActions}
        />
      )}
      {total !== undefined && total > 0 && (
        <div className="flex gap-2 flex-col-reverse md:flex-row items-center md:justify-between justify-center overflow-auto px-2">
          <span className="text-sm text-muted-foreground">
            Total de elementos: {total}
          </span>
          <div className="flex gap-2 flex-col-reverse md:flex-row items-center md:justify-between justify-center">
            <RowsPerPage
              itemsPerPage={pageSize}
              onItemsPerPageChange={handlePageSizeChange}
            />
            <Pagination
              currentPage={currentPage}
              pageSize={pageSize}
              totalPages={Math.ceil(total / pageSize)}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      )}
    </>
  );
};
export default AllViewItems;
