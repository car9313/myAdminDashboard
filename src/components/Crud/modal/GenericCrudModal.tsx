import ContainerWithPagination from "@/components/ContainerWithPagination/ContainerWithPagination";
import { DataTable } from "@/components/dataTable/DataTable";
import DataTableSkeleton from "@/components/skeletons/DataTableSkeleton";
import useCrudModal from "@/hooks/crud/modal/useCrudModal";
import { ActionDef } from "@/interfaces/actionDef";
import { WithId } from "@/interfaces/withId";
import { IconCirclePlus } from "@tabler/icons-react";
import CrudContainer from "../CrudContainer";
import { ModalKeys } from "@/interfaces/modalMode";
import { Button } from "@/components/custom/button";

interface GenericCrudModalProps<T> {
  title: string;
  dataApi: any;
  columns: any[];
  extraActions?: ActionDef<T>[];
  FilterComponent: React.ComponentType<any>;
  ModalComponent: React.ComponentType<any>;
}

const GenericCrudModal = <T extends WithId, TFilters>({
  title,
  dataApi,
  columns,
  extraActions,
  FilterComponent,
  ModalComponent,
}: GenericCrudModalProps<T>) => {
  const {
    data,
    isLoading,
    isError,
    modalManager,
    listActions,
    hasPermission,
    handleOpenModal,
    handleCloseModal,
    handleApplyFilters,
    handleClearFilters,
    currentPage,
    pageSize,
    handlePageChange,
    handlePageSizeChange,
  } = useCrudModal<T, TFilters>({ dataApi: dataApi });

  /* const columns = getColumns({ listActions }); */
  const modalState = modalManager.getModalState(ModalKeys.Modal);

  return (
    <CrudContainer title={title}>
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
          <FilterComponent
            onApplyFilters={handleApplyFilters}
            onClearFilters={handleClearFilters}
          />
          <ModalComponent
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
          total={data?.meta.total_count}
          currentPage={currentPage}
          pageSize={pageSize}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
        >
          <DataTable
            data={data?.objects || []}
            totalData={data?.meta.total_count || 0}
            columns={columns}
            currentPage={currentPage}
            pageSize={pageSize}
            acciones={listActions}
          />
        </ContainerWithPagination>
      )}
    </CrudContainer>
  );
};

export default GenericCrudModal;
