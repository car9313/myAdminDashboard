import { Item as Model } from "./models/item";
import { dataApi } from "./data/dataApi";
import FilterForm from "./components/FilterForm";
import useFilterData from "@/hooks/useFilterData";
import { Filters } from "./models/filters";
import CrudContainer from "@/components/Crud/CrudContainer";
import { Button } from "@/components/custom/button";
import { ActionDef } from "@/interfaces/actionDef";
import { extraActions } from "./data/extraAction";
import { IconCirclePlus } from "@tabler/icons-react";
import { useMemo } from "react";
import { getColumns } from "./components/Columns";
import { DataTable } from "@/components/dataTable/DataTable";
import usePagination from "@/hooks/usePagination";
import UseGetAllFromApi from "@/hooks/useGetAllFromApi";
import DataTableSkeleton from "@/components/skeletons/DataTableSkeleton";
import ContainerWithPagination from "@/components/ContainerWithPagination/ContainerWithPagination";
import useManagerModal from "@/hooks/crud/modal/useManagerModal";
import useModalActionCrud from "@/hooks/crud/modal/useModalActionCrud";
import DynamicModal from "./components/DynamicModal";
import { ModalKeys } from "@/interfaces/modalMode";
import useGetActionsWithPermissions from "@/hooks/useGetActionsWithPermissions";

const Items1 = () => {
  const modalManager = useManagerModal<Model>();

  const { crudActions, handleOpenModal, handleCloseModal } =
    useModalActionCrud<Model>({
      modalManager,
    });

  const actions: ActionDef<Model>[] = useMemo(
    () => (extraActions ? [...crudActions, ...extraActions] : crudActions),
    [crudActions, extraActions]
  );

  const { listActions = [], hasPermission } =
    useGetActionsWithPermissions<Model>({
      resource: "Item",
      actions,
    });
  const { appliedFilters, handleApplyFilters, handleClearFilters } =
    useFilterData<Filters>();
  const columns = getColumns({ listActions });

  const { currentPage, pageSize, handlePageChange, handlePageSizeChange } =
    usePagination<Filters>({ appliedFilters });

  const { data, isLoading, isError } = UseGetAllFromApi<Model, Filters>({
    ...dataApi,
    appliedFilters,
    page: currentPage,
    pageSize,
  });

  const modalState = modalManager.getModalState(ModalKeys.Modal);

  return (
    <CrudContainer title="CRUD Items">
      <div className="flex justify-between items-center ">
        <div className="flex gap-2 flex-1 items-center justify-start">
          {hasPermission(["create"]) && (
            <Button
              onClick={() =>
                handleOpenModal({ modalKey: ModalKeys.Modal, mode: "add" })
              }
            >
              <IconCirclePlus />
              Insertar
            </Button>
          )}
        </div>
        <div className="flex gap-2 flex-1 items-center justify-end">
          <FilterForm
            onApplyFilters={handleApplyFilters}
            onClearFilters={handleClearFilters}
          />
          <DynamicModal
            key={ModalKeys.Modal}
            mode={modalState?.mode}
            isOpen={modalState?.isOpen}
            onClose={() => handleCloseModal({ modalKey: ModalKeys.Modal })}
            item={modalState?.data}
          />
        </div>
      </div>
      {isError ? (
        <p className="text-red-500">Error al cargar los datos</p>
      ) : isLoading ? (
        <DataTableSkeleton rowCount={pageSize} columnCount={columns.length} />
      ) : (
        <ContainerWithPagination
          total={data?.total}
          currentPage={currentPage}
          pageSize={pageSize}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
        >
          <DataTable
            data={data?.objects || []}
            totalData={data?.total || 0}
            columns={columns}
            currentPage={currentPage}
            pageSize={pageSize}
          />
        </ContainerWithPagination>
      )}
    </CrudContainer>
  );
};
export default Items1;
