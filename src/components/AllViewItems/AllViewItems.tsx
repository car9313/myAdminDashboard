import ListCardView from "@/components/CardView/ListCardView";
import { DataTable } from "@/components/dataTable/DataTable";

import { Action } from "@/interfaces/action";
import { useState } from "react";
import ViewToggle from "@/components/viewToggle/ViewToggle";
import { ColumnDef } from "@tanstack/react-table";
import UseGetAllFromApi from "@/hooks/useGetAllFromApi";
import DataTableSkeleton from "@/components/dataTable/DataTableSkeleton";
import { dataApi } from "@/pages/privates/items/data/dataApi";

interface AllViewItemsProps<T, TFilter> {
  columns: ColumnDef<T>[];
  additionalActions: Action<T>[];
  appliedFilters: TFilter;
}
const AllViewItems = <T, TFilter>({
  columns,
  additionalActions,
  appliedFilters,
}: AllViewItemsProps<T, TFilter>) => {
  const { data: items = [], isLoading } = UseGetAllFromApi<T, TFilter>({
    ...dataApi,
    appliedFilters,
  });
  const [currentView, setCurrentView] = useState<boolean>(false); // Estado para la vista seleccionada
  const handleViewChange = () => {
    setCurrentView(!currentView);
  };

  return isLoading ? (
    <DataTableSkeleton />
  ) : (
    <div className="space-y-4">
      <ViewToggle onViewChange={handleViewChange} />
      {!currentView ? (
        <DataTable data={items} columns={columns} />
      ) : (
        <ListCardView<T>
          data={items}
          columnsDef={columns}
          className={"hover:shadow-md"}
          actions={additionalActions}
        />
      )}
    </div>
  );
};
export default AllViewItems;
