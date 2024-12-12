import { Item as Model } from "./models/item";
import { ItemFormSchema } from "./schemas/itemSchema";
import useManagerModalDatatable from "@/hooks/useManagerModalDatatable";
import { dataApi } from "./data/dataApi";
import useCrudQueryActions from "@/hooks/useCrudQueryActions";
import useGetActionCrud from "@/hooks/useGetActionCrud";
import FilterForm from "./components/FilterForm";
import useFilterData from "@/hooks/useFilterData";
import { Filters } from "./models/filters";
import AllViewItems from "@/components/AllViewItems/AllViewItems";
import { getColumnsGeneric } from "@/components/dataTable/DataTableColumns";
import { colDef } from "./data/colDef";
import { useMemo } from "react";
import { itemActionsList } from "@/data/itemCrudActionsList";
import CrudHeader from "@/components/Crud/CrudHeader";
import CrudModal from "./components/CrudModal";
import CrudContainer from "@/components/Crud/CrudContainer";
import { ConfirmDialog } from "@/components/confirm-dialog";
import { useModal } from "@/hooks/useModal";

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
  } = useManagerModalDatatable<Model>();
  const {
    isOpen: isConfirmOpen,
    openModal: openConfirm,
    closeModal: closeConfirm,
  } = useModal();
  const { mutationDelete } = useCrudQueryActions<ItemFormSchema>({
    ...dataApi,
  });
  const handleDelete = (row: Model) => {
    mutationDelete.mutate(row.id);
  };
  const { listActions } = useGetActionCrud<Model>({
    onView: handleOpenModal,
    onEdit: handleOpenModal,
    onDelete: openConfirm,
    resource: "Item",
    actionsList: itemActionsList,
  });

  const columns = useMemo(
    () => getColumnsGeneric<Model>({ actions: listActions, colDef }),
    [colDef, listActions]
  );

  return (
    <CrudContainer>
      <CrudHeader
        title="CRUD"
        nameAction="Add"
        onAdd={() => handleOpenModal({ mode: "add" })}
      />
      <FilterForm
        onApplyFilters={handleApplyFilters}
        onClearFilters={handleClearFilters}
      />
      <AllViewItems<Model, Filters>
        columns={columns}
        listActions={listActions}
        appliedFilters={appliedFilters}
        dataApi={dataApi}
      />
      <CrudModal
        isModalOpen={isModalOpen}
        modalMode={modalMode}
        currentItem={currentItem}
        handleCloseModal={handleCloseModal}
        title={title}
      />
      <ConfirmDialog
        isOpen={isConfirmOpen}
        onClose={closeConfirm}
        onConfirm={() => handleDelete}
        title="Confirm Deletion"
        description="Are you sure you want to delete this user? This action cannot be undone."
      />
    </CrudContainer>
  );
};
export default Items;
