import CrudContainer from "@/components/Crud/CrudContainer";
import { Button } from "@/components/custom/button";
import { ModalKeys } from "@/interfaces/modalMode";
import { IconCirclePlus } from "@tabler/icons-react";
import FilterForm from "./components/FilterForm";
import DataTableSkeleton from "@/components/skeletons/DataTableSkeleton";
import ContainerWithPagination from "@/components/ContainerWithPagination/ContainerWithPagination";
import { DataTable } from "@/components/dataTable/DataTable";
import useCrudModal from "@/hooks/crud/modal/useCrudModal";
import { dataApi } from "./data/dataApi";
import { Solicitud } from "./models/requests";
import { RequestFormSchema } from "./schemas/requestsSchema";
import { lazy, Suspense } from "react";
import Loader from "@/components/loader";
import { columns } from "./components/Columns";

const DynamicModalLazy = lazy(() => import("./components/DynamicModal"));
const Requests = () => {
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
  } = useCrudModal<Solicitud, RequestFormSchema>({ dataApi: dataApi });

  /* const columns = getColumns({ listActions }); */
  const modalState = modalManager.getModalState(ModalKeys.Modal);

  return (
    <CrudContainer title="CRUD Solicitudes">
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
          <Suspense fallback={<Loader />}>
            <DynamicModalLazy
              key={ModalKeys.Modal}
              mode={modalState?.mode}
              isOpen={modalState?.isOpen}
              onClose={() => handleCloseModal({ modalKey: ModalKeys.Modal })}
              item={modalState?.data}
            />
          </Suspense>
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

export default Requests;
