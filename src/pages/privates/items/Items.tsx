import { Item } from "./models/item";
import UseGetAllFromApi from "@/hooks/useGetAllFromApi";
import { DataTable } from "@/components/dataTable/DataTable";
import { createItemColumns } from "./components/Columns";
import { ItemFormSchema } from "./schemas/itemSchema";
import { Action } from "@/interfaces/action";
import { Button } from "@/components/custom/button";
import ViewToggle from "@/components/viewToggle/ViewToggle";
import CardItem from "./components/CardItem";
import WindowsModal from "@/components/modal/WindowsModal";
import CrudForm from "./components/CrudForm";
import useManagerModalDatatable from "@/hooks/useManagerModalDatatable";
import { dataApi } from "./data/dataApi";
import useCrudQueryActions from "@/hooks/useCrudQueryActions";
import useGetActionCrud from "@/hooks/useGetActionCrud";
import { useState } from "react";
import FilterForm from "./components/FilterForm";
import ViewData from "./components/ViewData";
import DataTableSkeleton from "@/components/dataTable/DataTableSkeleton";

interface Filters {
  name?: string;
  description?: string;
  dateRange?: { start: null, end: null },
  status?: '',
  categories?: [],
}

const Items = () => {
  const [appliedFilters, setAppliedFilters] = useState<Filters>({});
  const {
    isModalOpen,
    currentItem,
    currentView,
    modalMode,
    handleOpenModal,
    handleCloseModal,
    handleViewChange,
    title,
  } = useManagerModalDatatable<Item>();
  const { data: items = [], isLoading } = UseGetAllFromApi<Item, Filters>({
    ...dataApi,
    appliedFilters,
  });

  const handleApplyFilters = (filters: Filters) => {
    setAppliedFilters(filters);
  };

  const handleClearFilters = () => {
    setAppliedFilters({});
  };

  const { mutationDelete } = useCrudQueryActions<ItemFormSchema>({
    ...dataApi,
  });
  const handleDelete = (row: Item) => {
    mutationDelete.mutate(row.id);
  };
  const { crudActions } = useGetActionCrud<Item>({
    onView: handleOpenModal,
    onEdit: handleOpenModal,
    onDelete: handleDelete,
  });
  const additionalActions: Action<Item>[] = [
    ...crudActions,
    {
      label: "Duplicate",
      action: (row: Item) => {
        console.log("Duplicating item:", row);
      },
    },
  ];

  const columns = createItemColumns({
    actions: additionalActions,
  });
  (function getKeysWithArrayObjects () {
    const itemsKeys = Object.keys(items)
    console.log(itemsKeys)
  })()

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">CRUD</h1>
        <ViewToggle onViewChange={handleViewChange} />
      </div>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <FilterForm
            onApplyFilters={handleApplyFilters}
            onClearFilters={handleClearFilters}
            disabledFilter={items.length == 0}
          />
          <Button onClick={() => handleOpenModal(undefined, "add")}>Add</Button>
        </div>

        {!currentView ? (
          isLoading ? (
            <DataTableSkeleton />
          ) : (
            <DataTable data={items} columns={columns} />
          )
        ) : items.length > 0 ? (
          <div className="faded-bottom no-scrollbar grid gap-4 overflow-auto pb-16 pt-4 md:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <CardItem itemSelected={item} actions={additionalActions} />
            ))}
          </div>
        ) : (
          <p className="text-center text-red-500">
            No existen elementos para mostrar
          </p>
        )}
      </div>
      <WindowsModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={title}
      >
        {modalMode === "view" ? (
          <ViewData currentItem={currentItem} />
        ) : (
          <CrudForm
            modalMode={modalMode}
            currentItem={currentItem}
            onCloseModal={handleCloseModal}
          />
        )}
      </WindowsModal>
    </div>
  );
};
export default Items;
