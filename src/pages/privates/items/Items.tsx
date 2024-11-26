import { Item } from "./models/item";
import { ItemFormSchema } from "./schemas/itemSchema";
import { Action } from "@/interfaces/action";
import { Button } from "@/components/custom/button";
import WindowsModal from "@/components/modal/WindowsModal";
import CrudForm from "./components/CrudForm";
import useManagerModalDatatable from "@/hooks/useManagerModalDatatable";
import { dataApi } from "./data/dataApi";
import useCrudQueryActions from "@/hooks/useCrudQueryActions";
import useGetActionCrud from "@/hooks/useGetActionCrud";
import FilterForm from "./components/FilterForm";
import CardViewContent from "@/components/CardView/CardViewContent";
import useFilterData from "@/hooks/useFilterData";
import { Filters } from "./models/filters";
import AllViewItems from "@/components/AllViewItems/AllViewItems";
import { getColumnsGeneric } from "@/components/dataTable/DataTableColumns";
import { colDef } from "./data/colDef";
import { ColumnDef } from "@tanstack/react-table";
import DataActions from "@/components/dataActions/DataActions";

const Items = () => {
  const { appliedFilters, handleApplyFilters, handleClearFilters } =
    useFilterData<Filters>();
  const {
    isModalOpen,
    currentItem,
    modalMode,
    handleOpenModal,
    handleCloseModal,
    title,
  } = useManagerModalDatatable<Item>();

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
  const columns = getColumnsGeneric<Item>({ colDef });
  const columnsWithActions: ColumnDef<Item>[] = !additionalActions
    ? columns
    : [
        ...columns,
        {
          header: "Acciones",
          accessorKey: "acciones",
          enableHiding: false,
          cell: ({ row }) => (
            <DataActions
              itemSelected={row.original}
              actions={additionalActions}
            />
          ),
          size: 50,
        },
      ];

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">CRUD</h1>
      </div>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <FilterForm
            onApplyFilters={handleApplyFilters}
            onClearFilters={handleClearFilters}
          />
          <Button onClick={() => handleOpenModal(undefined, "add")}>Add</Button>
        </div>
        <AllViewItems<Item, Filters>
          columns={columnsWithActions}
          additionalActions={additionalActions}
          appliedFilters={appliedFilters}
        />
      </div>
      <WindowsModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={title}
      >
        {modalMode === "view" ? (
          currentItem && (
            <CardViewContent<Item>
              key={currentItem.id}
              data={currentItem}
              defCardViewKey={colDef}
            />
          )
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
