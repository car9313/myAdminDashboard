import ListCardView from "@/components/CardView/ListCardView";
import { DataTable } from "@/components/dataTable/DataTable";
import { useState } from "react";
import ViewToggle from "@/components/viewToggle/ViewToggle";
import { ColumnDef } from "@tanstack/react-table";
import UseGetAllFromApi from "@/hooks/useGetAllFromApi";
import DataTableSkeleton from "@/components/skeletons/DataTableSkeleton";
import { getDefCardViewKey } from "@/utils/utilities";
import { typeListView } from "@/interfaces/typeListView";
import { ActionDef } from "@/interfaces/actionDef";

interface AllViewItemsProps<T, TFilter> {
  columns: ColumnDef<T>[];
  listActions?: ActionDef<T>[];
  appliedFilters?: TFilter;
  dataApi: {
    key: string;
    endPoint: string;
  };
  listView?: typeListView;
}
const AllViewItems = <T, TFilter>({
  columns,
  listActions,
  appliedFilters,
  dataApi,
  listView = "optional",
}: AllViewItemsProps<T, TFilter>) => {
  const { data: items = [], isLoading } = UseGetAllFromApi<T, TFilter>({
    ...dataApi,
    appliedFilters,
  });
  const initialCurrentView = listView === "card" ? true : false;
  const [currentView, setCurrentView] = useState<boolean>(initialCurrentView); // Estado para la vista seleccionada
  const handleViewChange = () => {
    if (listView === "optional") {
      setCurrentView(!currentView);
    }
  };
  return isLoading ? (
    <DataTableSkeleton />
  ) : (
    <div className="space-y-4">
      {listView === "optional" && (
        <ViewToggle onViewChange={handleViewChange} />
      )}
      {!currentView ? (
        <DataTable data={items} columns={columns} />
      ) : (
        <ListCardView<T>
          data={items}
          columnsDef={getDefCardViewKey(columns)}
          className={"hover:shadow-md"}
          actions={listActions}
        />
      )}
    </div>
  );
};
export default AllViewItems;
