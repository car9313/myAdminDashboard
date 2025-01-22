import CrudContainer from "@/components/Crud/CrudContainer";
import { Button } from "@/components/custom/button";
import { ModalKeys } from "@/interfaces/modalMode";
import { IconCirclePlus } from "@tabler/icons-react";
import FilterForm from "./components/FilterForm";
import DynamicModal from "./components/DynamicModal";
import DataTableSkeleton from "@/components/skeletons/DataTableSkeleton";
import ContainerWithPagination from "@/components/ContainerWithPagination/ContainerWithPagination";
import { DataTable } from "@/components/dataTable/DataTable";
import useCrudModal from "@/hooks/crud/modal/useCrudModal";
import { Item } from "./models/item";
import { dataApi } from "./data/dataApi";
import { Filters } from "./models/filters";
import { getColumns } from "./components/Columns";

const Items = () => {
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
  } = useCrudModal<Item, Filters>({ dataApi: dataApi });

  const columns = getColumns({ listActions });
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

export default Items;
